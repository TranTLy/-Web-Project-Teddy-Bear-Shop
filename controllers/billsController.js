var ObjectId = require("mongodb").ObjectID;
const Bill = require("../models/bill");
const ListProductInBill = require("../models/listProductInBill");
const Customer = require("../models/customer");
const Product = require("../models/product");
var moment = require("moment");

exports.index = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.render("pages/bills/index", { title: "QUản lý đặt hàng" });
  }
  return res.redirect("/");
};

exports.get = async function(req, res) {
  const bills = await Bill.find({}, (err, result) => {
    return result;
  });
  await Promise.all(
    bills.map(async bill => {
      const customer = await Customer.findOne({
        _id: ObjectId(bill.id_customer)
      });
      bill.name_customer = customer.name;
      return bill;
    })
  );

  res.render("pages/bills/index", {
    title: "Đơn hàng",
    bills: bills,
    moment: moment
  });
};
exports.search_sort = function(req, res, next) {
  res.render("pages/bills/index", { title: "Quản lý đặt hàng" });
};

exports.getProductsByIdBill = async function(req, res) {
  const id = req.query._id;
  const bill = await ListProductInBill.findOne({ _id: ObjectId(id) });
  await Promise.all(
    bill.products.map(async product => {
      const productMongo = await Product.findOne({
        _id: ObjectId(product.id_product)
      });
      product.imgs = productMongo.imgs;
      product.name = productMongo.name;
      product.price = productMongo.price;
      product.discount = productMongo.discount;
      return product;
    })
  );
  res.send(bill.products);
};

exports.update = function(req, res, next) {
  let billUpdate = req.body;
  console.log("billUpdate", billUpdate);
  let id = req.params._id;

  Bill.findByIdAndUpdate(id, billUpdate, function(err, model) {
    if (err) {
      res.send({ isSuccess: false, msg: "Cập nhật thất bại!" });
      return;
    }
    res.send({ isSuccess: true, msg: "Cập nhật thành công!" });
  });
};

function getDay(startDate, res) {
  let endDay = moment(startDate)
    .add(1, "M")
    .toDate();

  console.log("startDAte", startDate);

  Bill.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lt: endDay }
      }
    },
    {
      $group: {
        _id: { day: { $dayOfMonth: "$date" } },
        total: { $sum: "$total" }
      }
    }
  ])
    .then(result => {
      let list = Array(31);
      list.fill(0);

      result.forEach(element => {
        list[element._id.day - 1] = element.total;
      });

      res.send({ list: list });
    })
    .catch(err => {
      console.log("err", err);
    });
}

function getWeek(startDate, res) {
  let endDay = moment(startDate)
    .add(1, "M")
    .toDate();

  console.log("startDAteWeek", startDate);

  Bill.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lt: endDay }
      }
    },
    {
      $group: {
        _id: { day: { $dayOfMonth: "$date" } },
        total: { $sum: "$total" }
      }
    }
  ])
    .then(result => {
      let list = Array(31);
      list.fill(0);

      result.forEach(element => {
        list[element._id.day - 1] = element.total;
      });

      let listWeek = Array(4);
      listWeek.fill(0);

      for (let i = 0; i <= 7; i++) {
        listWeek[0] += list[i];
      }
      for (let i = 8; i <= 14; i++) {
        listWeek[1] += list[i];
      }
      for (let i = 15; i <= 21; i++) {
        listWeek[2] += list[i];
      }
      for (let i = 22; i <= 30; i++) {
        listWeek[3] += list[i];
      }
      console.log("WeekList", listWeek);
      res.send({ list: listWeek });
    })
    .catch(err => {
      console.log("err", err);
    });
}

function getMonth(startDate, res) {
  let endDay = moment(startDate)
    .add(1, "Y")
    .toDate();

  console.log("startDAteMonth", startDate);
  console.log("EndDAteMonth", endDay);

  Bill.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lt: endDay }
      }
    },
    {
      $group: {
        _id: { month: { $month: "$date" } },
        total: { $sum: "$total" }
      }
    }
  ])
    .then(result => {
      let list = Array(12);
      list.fill(0);

      console.log("Month", result);

      result.forEach(element => {
        list[element._id.month - 1] = element.total;
      });

      res.send({ list: list });
    })
    .catch(err => {
      console.log("err", err);
    });
}

function getQuarter(startDate, res) {
  let endDay = moment(startDate)
    .add(1, "Y")
    .toDate();

  console.log("startDAteMonth", startDate);

  Bill.aggregate([
    {
      $match: {
        date: { $gte: startDate, $lt: endDay }
      }
    },
    {
      $group: {
        _id: { month: { $month: "$date" } },
        total: { $sum: "$total" }
      }
    }
  ])
    .then(result => {
      let list = Array(12);
      list.fill(0);

      console.log("Quarter", result);

      result.forEach(element => {
        list[element._id.month - 1] = element.total;
      });

      let listQuarter = Array(4);
      listQuarter.fill(0);

      for (let i = 0; i <= 2; i++) {
        listQuarter[0] += list[i];
      }
      for (let i = 3; i <= 5; i++) {
        listQuarter[1] += list[i];
      }
      for (let i = 6; i <= 8; i++) {
        listQuarter[2] += list[i];
      }
      for (let i = 9; i <= 11; i++) {
        listQuarter[3] += list[i];
      }

      res.send({ list: listQuarter });
    })
    .catch(err => {
      console.log("err", err);
    });
}

function getYear(endDate, res) {
  let endDay = moment(endDate)
    .add(1, "Y")
    .toDate();
  let startDay = moment(endDate)
    .add(-9, "Y")
    .toDate();

  console.log("StartYear", startDay);
  console.log("EndYear", endDay);
  let startYear = startDay.getFullYear();

  Bill.aggregate([
    {
      $match: {
        date: { $gte: startDay, $lt: endDay }
      }
    },
    {
      $group: {
        _id: { year: { $year: "$date" } },
        total: { $sum: "$total" }
      }
    }
  ])
    .then(result => {
      let list = Array(10);
      list.fill(0);
      let labels = Array(10);

      console.log("Quarter", result);

      for(let i = startYear;i < startYear + 10;i++) {
        labels[i-startYear] = i.toString();
      }

      result.forEach(element => {
        list[element._id.year - startYear] = element.total;
      });

      res.send({ list: list,labels: labels});
    })
    .catch(err => {
      console.log("err", err);
    });
}

exports.getStatistic = function(req, res, next) {
  let startDate = moment(new Date(req.query.start_date))
    .set("D", 1)
    .toDate();

  let mode = req.query.mode;
  switch (mode) {
    case "day":
      getDay(startDate, res);
      break;
    case "week":
      getWeek(startDate, res);
      break;
    case "month":
      startDate = moment(startDate)
        .set("M", 0)
        .toDate();
      getMonth(startDate, res);
      break;
    case "quarter":
      startDate = moment(startDate)
        .set("M", 0)
        .toDate();
      getQuarter(startDate, res);
      break;
    case "year":
      startDate = moment(startDate)
        .set("M", 0)
        .toDate();
      getYear(startDate, res);
      break;
  }
};
