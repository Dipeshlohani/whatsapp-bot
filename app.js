var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const config = require("config");

var routeManager = require("./routes");
var app = express();

mongoose.connect(config.get("db.url"), {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
console.warn = msg => {
  console.log("\x1b[33m", "WARNING!!! " + msg, "\x1b[0m");
};

//view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", routeManager);

app.use(function(req, res, next) {
  // Website you wish to allow to connect
  var allowedOrigins = [];
  if (config.has("cors")) allowedOrigins = config.get("cors") || [];
  var origin = req.headers.origin;

  if (allowedOrigins.indexOf(origin) > -1) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Request methods you wish to allow
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

  // Request headers you wish to allow
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  //res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(function(req, res, next) {
  if (req.headers["content-type"] == "application/json") {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
  } else {
    res.status(404).render("misc/404", {
      title: "Not Found",
      status: 404,
      url: req.url
    });
  }
});

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      success: false,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: {}
  });
});

module.exports = app;
