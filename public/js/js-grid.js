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
      $("#describe").val(category.describe);
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
        price: $("#price").val(),
        discount: $("#discount").val(),
        size: $("#size").val(),
        color: $("#color").val(),
        type: parseInt($("#type").val(), 10),
        describe: $("#describe").val(),
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
  });
})(jQuery);
