(function($) {
  "use strict";
  $(function() {
    //function dialog form
    var dialog = $("#dialog-form").dialog({
      autoOpen: false,
      width: 300,
      modal: true,
      closeOnEscape: true,
      buttons: {
        Lưu: function() {
          $("#categoryForm").submit();
        },
        Đóng: function() {
          $(this).dialog("close");
        }
      },
      close: function() {
        dialog.find("form")[0].reset();
      }
    });

    var submitHandler;

    dialog.find("form").submit(function(e) {
      e.preventDefault();
      submitHandler();
    });

    var showDetailsDialog = function(dialogType, category) {
      submitHandler = function(event) {
        //if($("#categoryForm").valid()) {
        saveClient(category, dialogType === "Add");
        //}
      };
      $("#name").val(category.name);
      $("#_id").val(category._id);
      $("#price").val(category.price);
      $("#discount").val(category.discount);
      $("#size").val(category.size);
      $("#color").val(category.color);
      $("#type").val(category.type);
      $("#decription").val(category.decription);
      $("#imgs").val(category.imgs);
      dialog
        .dialog("option", "title", dialogType + " thông tin")
        .dialog("open");
      console.log("type", type);
    };

    var saveClient = function(category, isNew) {
      $.extend(category, {
        name: $("#name").val(),
        _id: $("#_id").val(),
        price: parseInt($("#price").val(), 10),
        discount: parseFloat($("#discount").val()),
        size: $("#size").val(),
        color: $("#color").val(),
        type: parseInt($("#type").val(), 10),
        decription: $("#decription").val(),
        imgs: $("#imgs").val()
      });
      console.dir(category);
      $("#js-grid-products").jsGrid(
        isNew ? "insertItem" : "updateItem",
        category
      );

      dialog.dialog("close");
    };

    $.ajax({
      url: "/products/getTypes",
      type: "get",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      success: function(types) {
        $("#loading").hide();
        $("#js-grid-products").jsGrid({
          height: "500px",
          width: "100%",
          filtering: true,
          editing: true,
          inserting: true,
          sorting: true,
          paging: true,
          autoload: true,
          pageSize: 10,
          pageButtonCount: 5,
          deleteConfirm: "Bạn thực sự muốn xóa sản phẩm này?",
          controller: {
            loadData: function(filter) {
              var d = $.Deferred();
              $.ajax({
                url: "/products/getProducts",
                type: "get",
                contentType: "application/json; charset=utf-8",
                data: filter,
                dataType: "json"
              }).done(function(items) {
                items = $.grep(items, function(item) {
                  return item.isDeleted === false;
                });
                d.resolve(items);
              });
              return d.promise();
            },
            insertItem: function(item) {
              console.log("insert asdfjlas;dfas", item);
              let trueB = true;
              console.log("insertto", typeof trueB);
              // console.log("data",data);
              $.ajax({
                url: "/products/insert",
                type: "post",
                data: item,
                dataType: "json"
              })
                .done(function(result) {
                  if (result.isSuccess) {
                    d.resolve(result.type);
                    console.log(result.msg);
                  } else {
                    d.reject();
                    console(result.msg);
                  }
                })
                .fail(function(err) {
                  d.reject();
                  alert(err);
                });
              return d.promise();
            },
            updateItem: function(item) {
              console.log("update");
              $.ajax({
                url: "/products/" + item._id,
                type: "put",
                data: item,
                dataType: "json",
                success: function(result) {
                  console.log("com", result);
                }
              });
            }
          },
          rowClick: function(args) {
            showDetailsDialog("Sửa", args.item);
          },
          fields: [
            {
              title: "Tên",
              name: "name",
              type: "text",
              width: 120
            },
            {
              title: "ID",
              name: "_id",
              type: "text",
              width: 100
            },
            {
              title: "Giá",
              name: "price",
              type: "number",
              width: 100
            },
            {
              title: "Chiếc khấu",
              name: "discount",
              type: "number",
              width: 80
            },
            {
              title: "Kích thước",
              name: "size",
              type: "text",
              width: 80
            },
            {
              title: "Màu sắc",
              name: "color",
              type: "text",
              width: 100
            },
            {
              title: "Mô tả",
              name: "decription",
              type: "textarea",
              width: 60,
              visible: false
            },
            {
              title: "Link hình",
              name: "imgs",
              type: "text",
              width: 100,
              visible: false,
              filtering: true
            },
            {
              title: "Loại",
              name: "type",
              type: "select",
              items: types,
              valueField: "_id",
              textField: "name"
            },
            {
              type: "control",
              editButton: false
            }
          ]
        });
      },
      error: function(error) {
        $("#loading").hide();
        console.log("ERR", error);
      }
    });
    $("#js-grid-typeproducts").jsGrid({
      height: "500px",
      width: "100%",
      filtering: true,
      editing: true,
      inserting: true,
      sorting: true,
      paging: true,
      autoload: true,
      pageSize: 10,
      pageButtonCount: 5,
      deleteConfirm: "Bạn thực sự muốn xóa sản phẩm này?",
      controller: {
        loadData: function(filter) {
          var d = $.Deferred();
          $.ajax({
            url: "/types/get",
            type: "get",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
          })
            .done(function(items) {
              d.resolve(items);
            })
            .fail(function(err) {
              d.reject();
              alert(err);
            });
          return d.promise();
        },
        insertItem: function(item) {
          var d = $.Deferred();
          $.ajax({
            url: "/types",
            type: "post",
            data: item,
            dataType: "json"
          })
            .done(function(result) {
              if (result.isSuccess) {
                d.resolve(result.type);
                console.log(result.msg);
              } else {
                d.reject();
                console(result.msg);
              }
            })
            .fail(function(err) {
              d.reject();
              alert(err);
            });
          return d.promise();
        },
        updateItem: function(item) {
          var d = $.Deferred();
          $.ajax({
            url: "/types/" + item._id,
            type: "put",
            dataType: "json",
            data: item
          })
            .done(function(result) {
              if (result.isSuccess) {
                d.resolve(item);
                console.log(result.msg);
              } else {
                alert(result.msg);
                d.reject();
              }
            })
            .fail(function(err) {
              d.reject();
              console.log("err", err);
            });
          return d.promise();
        },
        deleteItem: function(item) {
          var d = $.Deferred();
          console.log("Delete", item._id);
          if (typeof item._id === "undefined") {
            alert("Vui lòng chờ load id!\nPhải có id mới có thể xóa!");
          } else {
            $.ajax({
              url: "/types/" + item._id,
              type: "delete",
              dataType: "json"
            })
              .done(function(result) {
                if (result.isSuccess) {
                  alert(result.msg);
                  d.resolve();
                } else {
                  d.reject();
                  alert(result.msg);
                }
              })
              .fail(function(err) {
                d.reject();
                alert(err);
              });
          }
          return d.promise();
        }
      },
      fields: [
        {
          title: "ID",
          name: "_id",
          type: "text",
          width: 50,
          editing: false,
          inserting: false
        },
        {
          title: "Tên loại sản phẩm",
          name: "name",
          type: "text",
          width: 120,
          validate: "required"
        },
        {
          type: "control"
        }
      ]
    });
    $("#js-grid-origins").jsGrid({
      height: "500px",
      width: "100%",
      filtering: true,
      editing: true,
      inserting: true,
      sorting: true,
      paging: true,
      autoload: true,
      pageSize: 10,
      pageButtonCount: 5,
      deleteConfirm: "Bạn thực sự muốn xóa sản phẩm này?",
      controller: {
        loadData: function(filter) {
          var d = $.Deferred();
          $.ajax({
            url: "/origins/get",
            type: "get",
            contentType: "application/json; charset=utf-8",
            data: filter,
            dataType: "json"
          })
            .done(function(items) {
              d.resolve(items);
            })
            .fail(function(err) {
              d.reject();
              alert(err);
            });
          return d.promise();
        },
        insertItem: function(item) {
          var d = $.Deferred();
          $.ajax({
            url: "/origins",
            type: "post",
            data: item,
            dataType: "json"
          })
            .done(function(result) {
              if (result.isSuccess) {
                d.resolve(result.origin);
                console.log(result.msg);
              } else {
                d.reject();
                console(result.msg);
              }
            })
            .fail(function(err) {
              d.reject();
              alert(err);
            });
          return d.promise();
        },
        updateItem: function(item) {
          var d = $.Deferred();
          $.ajax({
            url: "/origins/" + item._id,
            type: "put",
            dataType: "json",
            data: item
          })
            .done(function(result) {
              if (result.isSuccess) {
                d.resolve(item);
                console.log(result.msg);
              } else {
                alert(result.msg);
                d.reject();
              }
            })
            .fail(function(err) {
              d.reject();
              console.log("err", err);
            });
          return d.promise();
        },
        deleteItem: function(item) {
          var d = $.Deferred();
          if (typeof item._id === "undefined") {
            alert("Vui lòng chờ load id!\nPhải có id mới có thể xóa!");
          } else {
            $.ajax({
              url: "/origins/" + item._id,
              type: "delete",
              dataType: "json"
            })
              .done(function(result) {
                if (result.isSuccess) {
                  alert(result.msg);
                  d.resolve();
                } else {
                  d.reject();
                  alert(result.msg);
                }
              })
              .fail(function(err) {
                d.reject();
                alert(err);
              });
            return d.promise();
          }
        }
      },
      fields: [
        {
          title: "ID",
          name: "_id",
          type: "text",
          width: 50,
          editing: false,
          inserting: false
        },
        {
          title: "Tên nơi xuất xứ",
          name: "name",
          type: "text",
          width: 120,
          validate: "required"
        },
        {
          type: "control"
        }
      ]
    });

    $("#js-grid-producers").jsGrid({
      height: "500px",
      width: "100%",
      filtering: true,
      editing: true,
      inserting: true,
      sorting: true,
      paging: true,
      autoload: true,
      pageSize: 10,
      pageButtonCount: 5,
      deleteConfirm: "Bạn thực sự muốn xóa sản phẩm này?",
      controller: {
        loadData: function(filter) {
          var d = $.Deferred();
          $.ajax({
            url: "/producers/get",
            type: "get",
            contentType: "application/json; charset=utf-8",
            data: filter,
            dataType: "json"
          })
            .done(function(items) {
              d.resolve(items);
            })
            .fail(function(err) {
              d.reject();
              alert(err);
            });
          return d.promise();
        },
        insertItem: function(item) {
          var d = $.Deferred();
          $.ajax({
            url: "/producers",
            type: "post",
            data: item,
            dataType: "json"
          })
            .done(function(result) {
              if (result.isSuccess) {
                d.resolve(result.producer);
                console.log(result.msg);
              } else {
                d.reject();
                console(result.msg);
              }
            })
            .fail(function(err) {
              d.reject();
              alert(err);
            });
          return d.promise();
        },
        updateItem: function(item) {
          var d = $.Deferred();
          $.ajax({
            url: "/producers/" + item._id,
            type: "put",
            dataType: "json",
            data: item
          })
            .done(function(result) {
              if (result.isSuccess) {
                d.resolve(item);
                console.log(result.msg);
              } else {
                alert(result.msg);
                d.reject();
              }
            })
            .fail(function(err) {
              d.reject();
              console.log("err", err);
            });
          return d.promise();
        },
        deleteItem: function(item) {
          var d = $.Deferred();
          if (typeof item._id === "undefined") {
            alert("Vui lòng chờ load id!\nPhải có id mới có thể xóa!");
          } else {
            $.ajax({
              url: "/producers/" + item._id,
              type: "delete",
              dataType: "json"
            })
              .done(function(result) {
                if (result.isSuccess) {
                  alert(result.msg);
                  d.resolve();
                } else {
                  d.reject();
                  alert(result.msg);
                }
              })
              .fail(function(err) {
                d.reject();
                alert(err);
              });
            return d.promise();
          }
        }
      },
      fields: [
        {
          title: "ID",
          name: "_id",
          type: "text",
          width: 50,
          editing: false,
          inserting: false
        },
        {
          title: "Tên nhà sản xuất",
          name: "name",
          type: "text",
          width: 120,
          validate: "required"
        },
        {
          type: "control"
        }
      ]
    });

    // $("#js-grid-producers").jsGrid({
    //   height: "500px",
    //   width: "100%",
    //   filtering: true,
    //   editing: true,
    //   inserting: true,
    //   sorting: true,
    //   paging: true,
    //   autoload: true,
    //   pageSize: 10,
    //   pageButtonCount: 5,
    //   deleteConfirm: "Bạn thực sự muốn xóa sản phẩm này?",
    //   controller: {
    //     loadData: function(filter) {
    //       var d = $.Deferred();
    //       $.ajax({
    //         url: "/producers/getProducers",
    //         type: "get",
    //         contentType: "application/json; charset=utf-8",
    //         data: filter,
    //         dataType: "json"
    //       }).done(function(items) {
    //         d.resolve(items);
    //       });
    //       return d.promise();
    //     }
    //   },
    //   fields: [
    //     {
    //       title: "ID",
    //       name: "_id",
    //       type: "text",
    //       width: 50,
    //       editing: false,
    //       inserting: false
    //     },
    //     {
    //       title: "Tên nhà cung cấp",
    //       name: "name",
    //       type: "text",
    //       width: 120,
    //       validate: "required"
    //     },

    //     {
    //       type: "control"
    //     }
    //   ]
    // });

    //basic config
    if ($("#js-grid").length) {
      $("#js-grid").jsGrid({
        height: "500px",
        width: "100%",
        filtering: true,
        inserting: true,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 15,
        pageButtonCount: 5,
        deleteConfirm: "Bạn thực sự muốn xóa người dùng này?",
        controller: {
          loadData: function(filter) {
            console.log("tems");

            var d = $.Deferred();
            $.ajax({
              url: "/users/getUser",
              type: "get",
              contentType: "application/json; charset=utf-8",
              data: filter,
              dataType: "json"
            }).done(function(items) {
              console.log("tems", items);
              d.resolve(items);
            });
            return d.promise();
          }
        },
        fields: [
          {
            title: "Họ và tên",
            name: "name",
            type: "text",
            width: 180
          },
          {
            title: "Gmail",
            name: "gmail",
            type: "text",
            width: 180
          },
          {
            title: "Số điện thoại",
            name: "phoneNumber",
            type: "text",
            width: 120
          },
          {
            title: "Giới tính",
            name: "gender",
            type: "select",
            items: db.genders,
            valueField: "Id",
            textField: "Name"
          },
          {
            title: "Tuổi",
            name: "age",
            type: "number",
            width: 80
          },
          {
            type: "control",
            editButton: false
          }
        ]
      });
    }
  });
})(jQuery);
