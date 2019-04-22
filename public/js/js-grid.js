(function ($) {
    'use strict';
    $(function () {

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
                autoload: true,
                pageSize: 15,
                pageButtonCount: 5,
                deleteConfirm: "Bạn thực sự muốn xóa người dùng này?",
                data: db.clients,
                fields: [{
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
                data: db.products,
                fields: [{
                    name: "Tên",
                    type: "text",
                    width: 120
                },
                {
                    name: "ID",
                    type: "text",
                    width: 100
                },
                {
                    name: "Giá",
                    type: "number",
                    width: 100
                },
                {
                    name: "Chiếc khấu",
                    type: "select",
                    items: db.products_discount,
                    valueField: "Id",
                    textField: "Name"
                },
                {
                    name: "Kích thước",
                    type: "select",
                    items: db.products_size,
                    valueField: "Id",
                    textField: "Name"
                },
                {
                    name: "Màu sắc",
                    type: "select",
                    items: db.products_color,
                    valueField: "Id",
                    textField: "Name"
                },
                {
                    name: "Mô tả",
                    type: "textarea",
                    width: 60,
                    visible: false
                },
                {
                    name: "Link hình",
                    type: "text",
                    // itemTemplate: function (value) {
                    //     return $("<a>").attr("href", value).text(value);
                    // }, 
                    width: 100,
                    visible: false,
                    filtering: true
                },
                {
                    name: "Loại",
                    type: "select",
                    items: db.products_type,
                    valueField: "Id",
                    textField: "Name"
                },
                {
                    type: "control"
                }
                ]
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

                fields: [{
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
                    itemTemplate: function (value, item) {
                        return $("<div>")
                            .addClass("form-check mt-0")
                            .append(
                                $("<label>").addClass("form-check-label")
                                    .append(
                                        $("<input>").attr("type", "checkbox")
                                            .addClass("form-check-input")
                                            .attr("checked", value || item.Checked)
                                            .on("change", function () {
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

                fields: [{
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
                    itemTemplate: function (value, item) {
                        return $("<div>")
                            .addClass("form-check mt-0")
                            .append(
                                $("<label>").addClass("form-check-label")
                                    .append(
                                        $("<input>").attr("type", "checkbox")
                                            .addClass("form-check-input")
                                            .attr("checked", value || item.Checked)
                                            .on("change", function () {
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
            $("#sort").on("click", function () {
                var field = $("#sortingField").val();
                $("#js-grid-sortable").jsGrid("sort", field);
            });
        }

    });
})(jQuery);