$('label').click(function () {
    var i = $(this).attr("id");
    if (i === "1") {
      $("#row-day").css({ display: 'flex', flexDirection: 'row' });
      $("#row-week-month").css({ display: 'none' });
      $("#row-quarter-year").css({ display: 'none' });
    }
    else if (i === "2") {
      $("#row-day").css({ display: 'none' });
      $("#row-week-month").css({ display: 'flex', flexDirection: 'row' });
      $("#row-quarter-year").css({ display: 'none' });
    }
    else if (i === "3") {
      $("#row-day").css({ display: 'none' });
      $("#row-week-month").css({ display: 'none' });
      $("#row-quarter-year").css({ display: 'flex', flexDirection: 'row' });
    }
})
