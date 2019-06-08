(function($) {
  "use strict";
  window.addEventListener(
    "load",
    function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName("needs-validation");
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener(
          "submit",
          function(event) {
            if (form.checkValidity() === false) {
              event.preventDefault();
              event.stopPropagation();
            }
            form.classList.add("was-validated");
          },
          false
        );
      });
    },
    false
  );

  $(function() {
    //function dialog form
    var dialog = $("#dialog-form").dialog(
      {
        autoOpen: false,
        width: 800,
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
      },
      "option",
      "position",
      "center"
    );

    var submitHandler;

    dialog.find("form").submit(function(e) {
      e.preventDefault();
      submitHandler();
    });

    var showDetailsDialog = function(dialogType, category) {
      submitHandler = function(event) {
        //if($("#categoryForm").valid()) {
        saveClient(category, dialogType === "Thêm");
        //}
      };
      $("#name").val(category.name);
      if (dialogType === "Sửa") {
        $("#_id").val(category._id);
      }
      $("#price").val(category.price);
      $("#discount").val(category.discount);
      $("#size").val(category.size);
      $("#color").val(category.color);
      $("#type").val(category.type);
      $("#producer").val(category.producer);
      $("#origin").val(category.origin);
      $("#decription").val(category.decription);
      $("#imgs").val(category.imgs);
      dialog
        .dialog("option", "title", dialogType + " thông tin")
        .dialog("open");
    };

    var saveClient = function(category, isNew) {
      if (isNew) {
        $.extend(category, {
          name: $("#name").val(),
          price: parseInt($("#price").val(), 10),
          discount: parseFloat($("#discount").val()),
          size: $("#size").val(),
          color: $("#color").val(),
          type: $("#type").val(),
          producer: $("#producer").val(),
          origin: $("#origin").val(),
          decription: $("#decription").val(),
          imgs: $("#imgs").val()
        });
      } else {
        $.extend(category, {
          name: $("#name").val(),
          _id: $("#_id").val(),
          price: parseInt($("#price").val(), 10),
          discount: parseFloat($("#discount").val()),
          size: $("#size").val(),
          color: $("#color").val(),
          type: $("#type").val(),
          producer: $("#producer").val(),
          origin: $("#origin").val(),
          decription: $("#decription").val(),
          imgs: $("#imgs").val()
        });
      }

      console.dir(category);
      $("#js-grid-products").jsGrid(
        isNew ? "insertItem" : "updateItem",
        category
      );

      dialog.dialog("close");
    };

    $.ajax({
      url: "/types/get",
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
          sorting: true,
          paging: true,
          noDataContent: "Không tìm thấy!",
          autoload: true,
          pageSize: 10,
          pageButtonCount: 5,
          deleteConfirm: "Bạn thực sự muốn xóa sản phẩm này?",
          controller: {
            loadData: function(filter) {
              var d = $.Deferred();
              $.ajax({
                url: "/products/get",
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
            deleteItem: function(item) {
              var d = $.Deferred();
              console.log("Delete", item._id);
              if (typeof item._id === "undefined") {
                alert("Vui lòng chờ load id!\nPhải có id mới có thể xóa!");
              } else {
                $.ajax({
                  url: "/products/" + item._id,
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
            },
            insertItem: function(item) {
              console.log("insert asdfjlas;dfas", item);
              var d = $.Deferred();
              $.ajax({
                url: "/products",
                type: "post",
                data: item,
                dataType: "json"
              })
                .done(function(result) {
                  if (result.isSuccess) {
                    d.resolve(result.product);
                    console.log(result.msg);
                    console.log(result.product);
                  } else {
                    d.reject();
                  }
                  alert(result.msg);
                  console.log(result.msg);
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
                url: "/products/" + item._id,
                type: "put",
                dataType: "json",
                data: item
              })
                .done(function(result) {
                  if (result.isSuccess) {
                    d.resolve(item);
                    console.log(result.msg);
                    console.log(result.result);
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
            }
          },
          rowClick: function(args) {
            console.log("args", args.item);
            showDetailsDialog("Sửa", args.item);
          },
          fields: [
            {
              title: "Tên",
              name: "name",
              type: "text",
              width: 120,
              validate: "required"
            },
            {
              title: "ID",
              name: "_id",
              type: "text",
              width: 100,
              inserting: false,
              editing: false
            },
            {
              title: "Giá",
              name: "price",
              type: "number",
              width: 100,
              validate: "required"
            },
            {
              title: "Chiếc khấu",
              name: "discount",
              type: "number",
              width: 80,
              validate: "required"
            },
            {
              title: "Kích thước",
              name: "size",
              type: "text",
              width: 80,
              validate: "required"
            },
            {
              title: "Màu sắc",
              name: "color",
              type: "text",
              width: 100,
              validate: "required"
            },
            {
              title: "Mô tả",
              name: "decription",
              type: "textarea",
              width: 60,
              validate: "required",
              visible: false
            },
            {
              title: "Link hình",
              name: "imgs",
              type: "text",
              width: 100,
              filtering: true,
              validate: "required",
              visible: false
            },
            {
              title: "Nhà sản xuất",
              name: "producer",
              type: "text",
              width: 100,
              filtering: true,
              validate: "required",
              visible: false
            },
            {
              title: "Xuất xứ",
              name: "origin",
              type: "text",
              width: 100,
              filtering: true,
              validate: "required",
              visible: false
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
              modeSwitchButton: false,
              editButton: false,
              headerTemplate: function() {
                return $("<a>")
                  .append("<i class='mdi mdi-plus menu-icon'></i>")
                  .on("click", function() {
                    showDetailsDialog("Thêm", {});
                  });
              }
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

    if ($("#js-grid-user").length) {
      $("#js-grid-user").jsGrid({
        height: "500px",
        width: "100%",
        filtering: true,
        sorting: true,
        paging: true,
        autoload: true,
        pageSize: 10,
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
          },
          updateItem: function(item) {
            console.log("Đang update", item);
            var d = $.Deferred();
            $.ajax({
              url: "/users/" + item._id,
              type: "put",
              dataType: "json",
              data: item
            })
              .done(function(result) {
                if (result.isSuccess) {
                  d.resolve(item);
                  console.log(result.msg);
                  console.log(result.result);
                  // alert(result.msg);
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
          }
        },

        rowClick: function(args) {
          window.location.href = "/detail?_id=" + args.item._id;
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
            name: "email",
            type: "text",
            width: 180
          },
          {
            title: "Trạng thái",
            name: "is_block",
            type: "boo",
            width: 180
          },
          {
            type: "control",
            itemTemplate: function(value, item) {
              if (item.is_block === "Hoạt động") {
                var editDeleteBtn = $(
                  '<i class="mdi mdi-account-minus menu-icon" type="button" title="Block">'
                ).on("click", function(e) {
                  item.is_block = "Bị khóa";
                  e.stopPropagation();
                  if (e.target.title == "Block") {
                    $("#js-grid-user").jsGrid("updateItem", item);
                  }
                });
                return editDeleteBtn; //
              } else {
                var editDeleteBtn = $(
                  '<i class="mdi mdi mdi-account-check menu-icon" type="button" title="UnBlock">'
                ).on("click", function(e) {
                  if (e.target.title == "UnBlock") {
                    e.stopPropagation();
                    item.is_block = "Hoạt động";
                    e.stopPropagation();
                    if (e.target.title == "UnBlock") {
                      $("#js-grid-user").jsGrid("updateItem", item);
                    }
                  }
                });
                return editDeleteBtn; //
              }
            }
          }
        ]
      });
    }
  });
})(jQuery);
