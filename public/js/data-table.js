(function($) {
  "use strict";
  $(function() {
    $("#order-listing").DataTable({
      aLengthMenu: [[5, 10, 15], [5, 10, 15]],
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

  $(".status_select").change(function() {
    var selected = $(this).val();

    const $td = $(this)
      .closest("tr")
      .children("td");
    const id = $td.eq(0).text();
    // const status = $td.eq(1).text().trim();
    var oldval =
      $(this).attr("data-old") !== undefined ? $(this).attr("data-old") : "";

    console.log("selected", selected);
    console.log("id", id);
    console.log("status", oldval);

    let res = confirm("Bạn chắc chắn muốn thay đổi?");
    if (res) {
      updateStatusBill(id, selected).then(result => {
        if (result.isSuccess) {
          $(this).val(selected);
          $(this).attr("data-old", selected);
          alert(result.msg);
          console.log(result.msg);
          return true;
        }
        alert(result.msg);
        console.log(result.msg);
      });
    }
    $(this).val(oldval);
    return false;
  });

  async function updateStatusBill(id, selected) {
    let resultFunc;

    resultFunc = await $.ajax({
      url: "/bills/" + id,
      type: "put",
      dataType: "json",
      data: { status: selected }
    });

    return resultFunc;
    // .done(function(result) {

    // })
    // .fail(function(err) {
    //   $(this).val(oldval);
    //   alert(err);
    //   return false;
    // });
    // return false;
  }
  // //Me
  $("body").removeClass(".modal-backdrop");
  $("#myModal").on("show.bs.modal", function(e) {
    $("#myModal")
      .find("#list-product")
      .empty();
    $("body").removeClass(".modal-backdrop");
    // $(".modal-backdrop").remove();
    var _button = $(e.relatedTarget);

    // console.log(_button, _button.parents("tr"));
    var _row = _button.parents("tr");
    // _row.onclick( () => {
    //     alert("AAAAAAAAAAA")
    // })

    var id = _row.find(".id").text();
    var date = _row.find(".date").text();
    var name = _row.find(".name_customer").text();
    var id_customer = _row.find(".id_customer").text();
    var city = _row.find(".city").text();
    var total = _row.find(".total").text();
    var status = _row.find(".status_select").attr("data-old")
    var badge = $(this).find(".status");
    if (status === "Đã giao") {
      if (badge.hasClass("badge-danger")) {
        badge.removeClass("badge-danger");
      }
      if (badge.hasClass("badge-warning")) {
        badge.removeClass("badge-warning");
      }
      badge.addClass("badge-success");
    } else if (status === "Chưa giao") {
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
    $.ajax({
      url: "/bills/getlistproducts?_id=" + id,
      type: "get",
      contentType: "application/json; charset=utf-8",
      dataType: "json"
    })
      .done(function(items) {
        items.map(item => {
          // <div class="col-sm-2" style="align-content:center;">
          //         <img src="../images/a1.jpg" style="width:50px;" class="img-rounded" alt="Cinque Terre" />
          //       </div>
          $("#myModal")
            .find("#list-product")
            .append(() => {
              return (
                '<div class="row">' +
                '<div class="col-sm-2" style="align-content:center;">' +
                '<img src="' +
                item.imgs +
                '" style="width:50px;" class="img-rounded" alt="Cinque Terre" />' +
                "</div>" +
                '<div class="col-sm-4 d-flex">' +
                '<h6 class="name-product" style="align-self: center;">' +
                item.name +
                "</h6>" +
                "</div>" +
                '<div class="col-sm-3 none-padding d-flex">' +
                '<h6 class="price-product" style="align-self: center;">' +
                item.price +
                "</h6>" +
                "</div>" +
                '<div class="col-sm-3 none-padding d-flex">' +
                '<h6 class="amount-product" style="align-self: center;">' +
                item.amount +
                "</h6>" +
                "</div>" +
                "</div>" +
                '<hr class="pt-0 pb-0 mt-1 mb-0" />'
              );
            });
          console.log("List", items);
        });
      })
      .fail(function(err) {
        alert(err);
      });

    $(this)
      .find(".id")
      .text(id);
    $(this)
      .find(".date")
      .text(date);
    $(this)
      .find(".name")
      .text(name);
    $(this)
      .find(".id_customer")
      .text("ID khách hàng: " + id_customer);
    $(this)
      .find(".city")
      .text("123 Hoàng Văn Thụ, Phường 5, Quận 9 ," + city);
    $(this)
      .find(".price_total")
      .text(total);
    $(this)
      .find(".status")
      .text(status);
  });
})(jQuery);
