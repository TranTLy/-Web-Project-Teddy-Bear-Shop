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
      url: "http://localhost:3000/products/getTypes",
      type: "get",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      autoload: true,
      success: function(types) {
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
                url: "http://localhost:3000/products/getProducts",
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
              //let data = {...item,isDelete: trueB, isStandOut: false, currentPrice : item.price, isNew: true};
              // console.log("data",data);
              $.ajax({
                url: "http://localhost:3000/products/insert",
                type: "post",
                //contentType: "application/json; charset=utf-8",
                data: item,
                dataType: "json"
              }).done(function(items) {
                console.log("Insert Thành công!");
              });
            },
            updateItem: function(item) {
              console.log("update");
              $.ajax({
                url: "http://localhost:3000/products/" + item._id,
                type: "put",
                data: item,
                dataType: "json"
              }).done(function(items) {
                console.log("Update successfully");
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
            url: "http://localhost:3000/products/getTypes",
            type: "get",
            contentType: "application/json; charset=utf-8",
            data: filter,
            dataType: "json"
          }).done(function(items) {
            d.resolve(items);
          });
          return d.promise();
        }
      },
      fields: [
        {
          title: "ID",
          name: "_id",
          type: "text",
          width: 50
        },
        {
          title: "Tên loại sản phẩm",
          name: "name",
          type: "text",
          width: 120
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
            url: "/producers/getProducers",
            type: "get",
            contentType: "application/json; charset=utf-8",
            data: filter,
            dataType: "json"
          }).done(function(items) {
            d.resolve(items);
          });
          return d.promise();
        }
      },
      fields: [
        {
          title: "ID",
          name: "_id",
          type: "text",
          width: 50
        },
        {
          title: "Tên nhà cung cấp",
          name: "name",
          type: "text",
          width: 120
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
            url: "/origins/getOrigins",
            type: "get",
            contentType: "application/json; charset=utf-8",
            data: filter,
            dataType: "json"
          }).done(function(items) {
            d.resolve(items);
          });
          return d.promise();
        },
        insertItem: function(item) {
          $.ajax({
            url: "/origins",
            type: "post",
            //contentType: "application/json; charset=utf-8",
            data: item,
            dataType: "json"
          }).done(function(items) {
            console.log("Insert Thành công!");
          });
        },
      deleteItem: function(item){
        $.ajax({
          url: "/origins/" + item._id,
          type: "delete",
          //contentType: "application/json; charset=utf-8",
          dataType: "json"
        }).done(function(items) {
          console.log("Xoa Thành công!");
        });
      }
    },
      fields: [
        {
          title: "ID",
          name: "_id",
          type: "text",
          width: 50,
          visible: false
        },
        {
          title: "Tên nơi xuất xứ",
          name: "name",
          type: "text",
          width: 120
        },

        {
          type: "control"
        }
      ]
    });

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
              url: "http://localhost:3000/users/getUser",
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
