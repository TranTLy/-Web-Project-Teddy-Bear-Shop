(function ($) {
  'use strict';
  $(function () {
    $('#order-listing').DataTable({
      "aLengthMenu": [
        [5, 10, 15, -1],
        [5, 10, 15, "Tất cả"]
      ],
      "iDisplayLength": 10,
      "language": {
        search: ""
      }
    });
    // $('#vip').on('click', 'tr', function () {
    //   alert("A");
    // });
    // $("#order-listing").on('click', '.btn', function () {
    //   // get the current row
    //   var currentRow = $(this).closest("tr");

    //   var col1 = currentRow.find("td:eq(0)").text(); // get current row 1st TD value
    //   var col2 = currentRow.find("td:eq(1)").text(); // get current row 2nd TD
    //   var col3 = currentRow.find("td:eq(2)").text(); // get current row 3rd TD
    //   var data = col1 + "\n" + col2 + "\n" + col3;
    //   // $.fancybox.open({
    //   //   src  : 'popup.html'
    //   // });
    //   // swal({
    //   //   text : "ABC",
    //   //   content: {
    //   //     element: "input",
    //   //     attributes: {
    //   //       type: "text",
    //   //       class: 'form-control',
    //   //       value: col1
    //   //     },
    //   //   },
    //   //   button: {
    //   //     text: "OK",
    //   //     value: true,
    //   //     visible: true,
    //   //     className: "btn btn-primary"
    //   //   }
    //   // })
    // });


    function Person(name, age, position) {
      this._name = name;
      this._age = age;
      this._position = position;

      this.name = function () {
        return this._name;
      };

      this.age = function () {
        return this._age;
      };

      this.position = function () {
        return this._position;
      };
    }


    $(document).ready(function () {
      var table = $('#example').DataTable({
        columns: [
          { data: null, render: 'name' },
          { data: null, render: 'age' },
          { data: null, render: 'position' }
        ]
      });

      table.row.add(new Person('Airi Satou', 33, 'Accountant'));
      table.row.add(new Person('Angelica Ramos', 47, 'Chief Executive Officer (CEO)'));
      table.row.add(new Person('Ashton Cox', 66, 'Junior Technical Author'));
      table.draw();
    });
    $('#order-listing').each(function () {
      var datatable = $(this);
      // SEARCH - Add the placeholder for Search and Turn this into in-line form control
      var search_input = datatable.closest('.dataTables_wrapper').find('div[id$=_filter] input');
      search_input.attr('placeholder', 'Tìm kiếm');
      search_input.removeClass('form-control-sm');
      // LENGTH - Inline-Form control
      var length_sel = datatable.closest('.dataTables_wrapper').find('div[id$=_length] select');
      length_sel.removeClass('form-control-sm');
    });
  });


  var data = [
    { code_cat: "code1", descr_fra: "Oui1", descr_eng: "Yes1", descr_deu: "Ja1" },
    { code_cat: "code2", descr_fra: "Oui2", descr_eng: "Yes2", descr_deu: "Ja2" },
    { code_cat: "code3", descr_fra: "Oui3", descr_eng: "Yes3", descr_deu: "Ja3" }
  ];

  var dialog = $("#dialog-form").dialog({
    autoOpen: false,
    width: 200,
    modal: true,
    closeOnEscape: true,
    buttons: {
      Save: function () {
        $("#categoryForm").submit();
      },
      Cancel: function () {
        $(this).dialog("close");
      }
    },
    close: function () {
      dialog.find("form")[0].reset();
    }
  });

  var submitHandler;

  dialog.find("form").submit(function (e) {
    e.preventDefault();
    submitHandler();
  });

  var showDetailsDialog = function (dialogType, category) {
    submitHandler = function (event) {
      //if($("#categoryForm").valid()) {
      saveClient(category, dialogType === "Add");
      //}
    };

    $("#code_cat").val(category.code_cat);
    $("#descr_fra").val(category.descr_fra);
    $("#descr_eng").val(category.descr_eng);
    $("#descr_deu").val(category.descr_deu);

    dialog.dialog("option", "title", dialogType + " category").dialog("open");
  };

  var saveClient = function (category, isNew) {
    $.extend(category, {
      code_cat: $("#code_cat").val(),
      descr_fra: $("#descr_fra").val(),
      descr_eng: $("#descr_eng").val(),
      descr_deu: $("#descr_deu").val()
    });
    console.dir(category);
    $("#js-grid-products1").jsGrid(isNew ? "insertItem" : "updateItem", category);

    dialog.dialog("close");
  };

  $("#js-grid-products1").jsGrid({
    height: 300,
    width: "100%",
    editing: true,
    autoload: true,
    paging: true,
    rowClick: function (args) {
      showDetailsDialog("Edit", args.item);
    },
    controller: {
      loadData: function () {
        return data;
      }
    },
    fields: [
      { name: "code_cat", type: "text", width: 150 },
      { name: "descr_fra", type: "text", width: 150 },
      { name: "descr_eng", type: "text", width: 150 },
      { name: "descr_deu", type: "text", width: 150 },
      {
        type: "control",
        modeSwitchButton: false,
        editButton: false,
        headerTemplate: function () {
          return $("<button>").attr("type", "button").text("Add")
            .on("click", function () {
              showDetailsDialog("Add", {});
            });
        }
      }
    ]
  });


  // //Me
  $('#myModal').on('show.bs.modal', function (e) {
    var _button = $(e.relatedTarget);

    // console.log(_button, _button.parents("tr"));
    var _row = _button.parents("tr");

    var my_id = _row.find(".my_id").text();
    var my_date = _row.find(".my_date").text();
    var my_name = _row.find(".my_name").text();
    var my_id_customer = _row.find(".my_id_customer").text();
    var my_city = _row.find(".my_city").text();
    var my_price = _row.find(".my_price").text();
    var my_status = _row.find(".my_status").text();
    var badge = $(this).find(".my_status");
    if (my_status === "Thành công") {
      if (badge.hasClass("badge-danger")) {
        badge.removeClass("badge-danger");
      }
      if (badge.hasClass("badge-warning")) {
        badge.removeClass("badge-warning");
      }
      badge.addClass("badge-success");
    } else if (my_status === "Bị hủy") {
      if (badge.hasClass("badge-success")) {
        badge.removeClass("badge-success");
      }
      if (badge.hasClass("badge-warning")) {
        badge.removeClass("badge-warning");
      }
      badge.addClass("badge-danger");
    } else {
      if (badge.hasClass("badge-success")) {
        badge.removeClass("badge-success");
      }
      if (badge.hasClass("badge-danger")) {
        badge.removeClass("badge-danger");
      }
      badge.addClass("badge-warning");
    }
    // console.log(_invoiceAmt, _chequeAmt);

    $(this).find(".my_id").text(my_id);
    $(this).find(".my_date").text(my_date);
    $(this).find(".my_name").text(my_name);
    $(this).find(".my_id_customer").text("ID khách hàng: " + my_id_customer);
    $(this).find(".my_city").text("123 Hoàng Văn Thụ, Phường 5, Quận 9 ," + my_city);
    $(this).find(".my_price").text(my_price - 22000 + " VNĐ");
    $(this).find(".my_price_total").text(my_price + " VNĐ");
    $(this).find(".my_status").text(my_status);

  });
})(jQuery);