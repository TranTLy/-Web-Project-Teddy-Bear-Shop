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
    //
    //basic config
    if ($("#js-grid").length) {
      $("#js-grid").jsGrid({
        height: "500px",
        width: "100%",
        filtering: true,
        editing: true,
        inserting: true,
        sorting: true,
        paging: true,
        autoload: false,
        pageSize: 15,
        pageButtonCount: 5,
        deleteConfirm: "Bạn thực sự muốn xóa người dùng này?",
        data: db.clients,
        controller: {
          loadData: function(filter) {
            console.log("loadData");
            //var d = $.Deferred();
            $.ajax({
              url: "http://localhost:3000/products/getDiscount",
              type: "get",
              contentType: "application/json; charset=utf-8",
              dataType: "text",
              success: function(result) {
                console.log("result");
                console.log(result);
              }
            });
            return null;
            // return d.promise();
          }
        },
        fields: [
          {
            name: "Họ và tên",
            type: "text",
            width: 180
          },
          {
            name: "Gmail",
            type: "text",
            width: 180
          },
          {
            name: "Số điện thoại",
            type: "text",
            width: 150
          },
          {
            name: "Giới tính",
            type: "select",
            items: db.countries,
            valueField: "Id",
            textField: "Name"
          },
          {
            name: "Tuổi",
            type: "number",
            width: 50
          },
          {
            type: "control"
          }
        ]
      });
    }
    // col = [{
    //     name: "Link hình",
    //     type: "text",
    //     width: 150
    // }
    // ]
    // if ($("#js-grid-products").length) {
    //   $("#js-grid-products").jsGrid({
    //     height: "500px",
    //     width: "100%",
    //     filtering: true,
    //     editing: true,
    //     inserting: true,
    //     sorting: true,
    //     paging: true,
    //     autoload: true,
    //     pageSize: 10,
    //     pageButtonCount: 5,
    //     deleteConfirm: "Bạn thực sự muốn xóa sản phẩm này?",
    //     rowClick: function(args) {
    //       showDetailsDialog("Sửa", args.item);
    //     },
    //     controller: {
    //       loadData: function(filter) {
    //         console.log("loadData");
    //         var d = $.Deferred();
    //         $.ajax({
    //           url: "http://localhost:3000/products/getDiscount",
    //           type: "get",
    //           contentType: "application/json; charset=utf-8",
    //           dataType: "json"
    //         }).done(function(items) {
    //             console.log("tc");
    //             console.log(items);
    //             d.resolve(items);
    //         })
    //         return d.promise();
    //       }
    //     },
    //     fields: [
    //       {
    //         title: "Tên",
    //         name: "name",
    //         type: "text",
    //         width: 120
    //       },
    //       {
    //         title: "ID",
    //         name: "ID",
    //         type: "text",
    //         width: 100
    //       },
    //       {
    //         title: "Giá",
    //         name: "price",
    //         type: "number",
    //         width: 100
    //       },
    //       {
    //         title: "Chiếc khấu",
    //         name: "discount",
    //         type: "select",
    //         items: "",
    //         valueField: "_id",
    //         textField: "value"
    //       },
    //       {
    //         title: "Kích thước",
    //         name: "size",
    //         type: "select",
    //         items: db.products_size,
    //         valueField: "Id",
    //         textField: "Name"
    //       },
    //       {
    //         title: "Màu sắc",
    //         name: "size",
    //         type: "select",
    //         items: db.products_color,
    //         valueField: "Id",
    //         textField: "Name"
    //       },
    //       {
    //         title: "Mô tả",
    //         name: "describe",
    //         type: "textarea",
    //         width: 60,
    //         visible: false
    //       },
    //       {
    //         title: "Link hình",
    //         name: "img",
    //         type: "text",
    //         // itemTemplate: function (value) {
    //         //     return $("<a>").attr("href", value).text(value);
    //         // },
    //         width: 100,
    //         visible: false,
    //         filtering: true
    //       },
    //       {
    //         title: "Loại",
    //         name: "category",
    //         type: "select",
    //         items: db.products_type,
    //         valueField: "Id",
    //         textField: "Name"
    //       },
    //       {
    //         type: "control",
    //         editButton: false
    //       }
    //     ]

    let dis = null;
    const get = async function() {
      console.log("loadData");
      let data = await $.ajax({
        url: "http://localhost:3000/products/getDiscount",
        type: "get",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(result) {
          if ($("#js-grid-products").length) {
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
              rowClick: function(args) {
                showDetailsDialog("Sửa", args.item);
              },
              fields: [
                { name: "id", width: 50 },
                {
                  title: "Màu sắc",
                  name: "size",
                  type: "select",
                  items: result,
                  valueField: "_id",
                  textField: "value"
                }
              ]
            });
          }
        }
      }
    }
    // if ($("#js-grid-products").length) {
    //   $("#js-grid-products").jsGrid({
    //     height: "500px",
    //     width: "100%",
    //     filtering: true,
    //     editing: true,
    //     inserting: true,
    //     sorting: true,
    //     paging: true,
    //     autoload: true,
    //     pageSize: 10,
    //     pageButtonCount: 5,
    //     deleteConfirm: "Bạn thực sự muốn xóa sản phẩm này?",
    //     rowClick: function(args) {
    //       showDetailsDialog("Sửa", args.item);
    //     },
    //     fields: [
    //       { name: "id", width: 50 },
    //       {
    //         title: "Màu sắc",
    //         name: "size",
    //         type: "select",
    //         items: db.products_discount,
    //         valueField: "_id",
    //         textField: "value",
    //         get: function() {
    //           console.log("loadData");
    //           $.ajax({
    //             url: "http://localhost:3000/products/getDiscount",
    //             type: "get",
    //             contentType: "application/json; charset=utf-8",
    //             dataType: "json",
    //             success: function(result) {
    //               console.log("func");
    //               products_discount = result;
    //             }
    //           });
    //         }
    //       }
    //     ]

        // rowRenderer: function (item) {
        //     var row = $("<tr>");
        //     var addressesGrid = $('<tr>').hide();
        //     addressesGrid.jsGrid({
        //         height: "500px",
        //         width: "100%",
        //         filtering: true,
        //         editing: true,
        //         inserting: true,
        //         sorting: true,
        //         paging: true,
        //         autoload: true,
        //         pageSize: 15,
        //         pageButtonCount: 5,
        //         deleteConfirm: "Bạn thực sự muốn xóa người dùng này?",
        //         data: db.clients,
        //         fields: [{
        //             name: "Họ và tên",
        //             type: "text",
        //             width: 180
        //         },
        //         {
        //             name: "Gmail",
        //             type: "text",
        //             width: 180
        //         },
        //         {
        //             name: "Số điện thoại",
        //             type: "text",
        //             width: 150
        //         },
        //         {
        //             name: "Giới tính",
        //             type: "select",
        //             items: db.countries,
        //             valueField: "Id",
        //             textField: "Name"
        //         },
        //         {
        //             name: "Tuổi",
        //             type: "number",
        //             width: 50
        //         },
        //         {
        //             type: "control"
        //         }
        //         ]
        //     })
        //     items = Object.keys(item)
        //     items.forEach(function (key) {
        //         if (key != items[items.length - 1]) {
        //             var cell = $("<td>").addClass("jsgrid-cell").append(item[key])
        //             row.append(cell)
        //         }
        //     })
        //     row.click(function () {
        //         addressesGrid.toggle();
        //     })
        //     return row.add(addressesGrid);
        // }
      });
    }

    //Static
    if ($("#js-grid-static").length) {
      $("#js-grid-static").jsGrid({
        height: "500px",
        width: "100%",

        sorting: true,
        paging: true,

        data: db.clients,

        fields: [
          {
            name: "Ten",
            type: "text",
            width: 150
          },
          {
            name: "Age",
            type: "number",
            width: 50
          },
          {
            name: "Address",
            type: "text",
            width: 200
          },
          {
            name: "Country",
            type: "select",
            items: db.countries,
            valueField: "Id",
            textField: "Name"
          },
          {
            name: "Married",
            title: "Is Married",
            itemTemplate: function(value, item) {
              return $("<div>")
                .addClass("form-check mt-0")
                .append(
                  $("<label>")
                    .addClass("form-check-label")
                    .append(
                      $("<input>")
                        .attr("type", "checkbox")
                        .addClass("form-check-input")
                        .attr("checked", value || item.Checked)
                        .on("change", function() {
                          item.Checked = $(this).is(":checked");
                        })
                    )
                    .append('<i class="input-helper"></i>')
                );
            }
          }
        ]
      });
    }

    //sortable
    if ($("#js-grid-sortable").length) {
      $("#js-grid-sortable").jsGrid({
        height: "500px",
        width: "100%",

        autoload: true,
        selecting: false,

        controller: db,

        fields: [
          {
            name: "Ten",
            type: "text",
            width: 150
          },
          {
            name: "Age",
            type: "number",
            width: 50
          },
          {
            name: "Address",
            type: "text",
            width: 200
          },
          {
            name: "Country",
            type: "select",
            items: db.countries,
            valueField: "Id",
            textField: "Name"
          },
          {
            name: "Married",
            title: "Is Married",
            itemTemplate: function(value, item) {
              return $("<div>")
                .addClass("form-check mt-0")
                .append(
                  $("<label>")
                    .addClass("form-check-label")
                    .append(
                      $("<input>")
                        .attr("type", "checkbox")
                        .addClass("form-check-input")
                        .attr("checked", value || item.Checked)
                        .on("change", function() {
                          item.Checked = $(this).is(":checked");
                        })
                    )
                    .append('<i class="input-helper"></i>')
                );
            }
          }
        ]
      });
    }

    if ($("#sort").length) {
      $("#sort").on("click", function() {
        var field = $("#sortingField").val();
        $("#js-grid-sortable").jsGrid("sort", field);
      });
    }
  });
})(jQuery);
