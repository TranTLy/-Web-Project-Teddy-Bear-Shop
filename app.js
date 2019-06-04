var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
const config = require("./config/database");
var passport = require("passport");
const session = require("express-session");
var cors = require("cors");
const flash = require("flash");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var expressLayouts = require("express-ejs-layouts");
var bodyParser = require("body-parser");
require("./config/passport");

var app = express();

app.use("*", cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(logger("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    saveUninitialized: true,
    resave: true
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(expressLayouts);

app.use("/", indexRouter);
app.use("/users", usersRouter);
// app.use("/dashboard", passport.authenticate("jwt", { session: false }), user);
app.set("layout", "layout");
// catch 404 and forward to error handler
mongoose.connect(
  config.database,
  { useCreateIndex: true, useNewUrlParser: true },
  (err, res) => {
    if (!err) {
      console.log("connect to databse successfully!");
    }
  }
);

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
