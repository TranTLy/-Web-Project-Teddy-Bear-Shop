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
      $("#id").val(category.ID);
      $("#price").val(category.price);
      $("#discount").val(category.discount);
      $("#size").val(category.size);
      $("#color").val(category.color),
        $("#category").val(category.category),
        $("#describe").val(category.describe),
        $("#img").val(category.img),
        dialog
          .dialog("option", "title", dialogType + " thông tin")
          .dialog("open");
    };

    var saveClient = function(category, isNew) {
      $.extend(category, {
        name: $("#name").val(),
        ID: $("#id").val(),
        price: $("#price").val(),
        discount: parseInt($("#discount").val(), 10),
        size: parseInt($("#size").val(), 10),
        color: parseInt($("#color").val(), 10),
        category: parseInt($("#category").val(), 10),
        describe: $("#describe").val(),
        img: $("#img").val()
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
              console.log("insert",item);
              let data = {...item,isDelete: false, isStandOut: false, currentPrice : item.price, isNew: true};
              console.log("data",data);
              $.ajax({
                url: "http://localhost:3000/products/insert",
                type: "post",
                //contentType: "application/json; charset=utf-8",
                data: data,
                dataType: "json"
              }).done(function(items) {
                console.log("Insert Thành công!");
              });
             },
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
  });
})(jQuery);
