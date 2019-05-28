(function($) {
  "use strict";
  $(function() {
    $("#order-listing").DataTable({
      aLengthMenu: [[5, 10, 15, -1], [5, 10, 15, "Tất cả"]],
      iDisplayLength: 10,
      language: {
        search: ""
      }
    });
    $("body").removeClass(".modal-backdrop");
    function Person(name, age, position) {
      this._name = name;
      this._age = age;
      this._position = position;

      this.name = function() {
        return this._name;
      };

      this.age = function() {
        return this._age;
      };

      this.position = function() {
        return this._position;
      };
    }

    $(document).ready(function() {
      var table = $("#example").DataTable({
        columns: [
          { data: null, render: "name" },
          { data: null, render: "age" },
          { data: null, render: "position" }
        ]
      });

      table.row.add(new Person("Airi Satou", 33, "Accountant"));
      table.row.add(
        new Person("Angelica Ramos", 47, "Chief Executive Officer (CEO)")
      );
      table.row.add(new Person("Ashton Cox", 66, "Junior Technical Author"));
      table.draw();
    });
    $("#order-listing").each(function() {
      var datatable = $(this);
      // SEARCH - Add the placeholder for Search and Turn this into in-line form control
      var search_input = datatable
        .closest(".dataTables_wrapper")
        .find("div[id$=_filter] input");
      search_input.attr("placeholder", "Tìm kiếm");
      search_input.removeClass("form-control-sm");
      // LENGTH - Inline-Form control
      var length_sel = datatable
        .closest(".dataTables_wrapper")
        .find("div[id$=_length] select");
      length_sel.removeClass("form-control-sm");
    });
  });

  // //Me
  $("body").removeClass(".modal-backdrop");
  $("#myModal").on("show.bs.modal", function(e) {
    $("body").removeClass(".modal-backdrop");
    // $(".modal-backdrop").remove();
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

    $(this)
      .find(".my_id")
      .text(my_id);
    $(this)
      .find(".my_date")
      .text(my_date);
    $(this)
      .find(".my_name")
      .text(my_name);
    $(this)
      .find(".my_id_customer")
      .text("ID khách hàng: " + my_id_customer);
    $(this)
      .find(".my_city")
      .text("123 Hoàng Văn Thụ, Phường 5, Quận 9 ," + my_city);
    $(this)
      .find(".my_price")
      .text(my_price - 22000 + " VNĐ");
    $(this)
      .find(".my_price_total")
      .text(my_price + " VNĐ");
    $(this)
      .find(".my_status")
      .text(my_status);
  });
})(jQuery);
