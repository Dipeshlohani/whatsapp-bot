const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("users");
});

router.get("/config", (req, res, next) => {
  res.render("config");
});

router.get("/user/add", (req, res, next) => {
  res.render("manualAdd");
});

router.get("/nakshatra", (req, res, next) => {
  res.render("nakshatra");
});

router.get("/nakshatralist/:id", (req, res, next) => {
  const nakshatra_id = req.params.id;
  res.render("updatesentiment.ejs", {
    nakshatra_id
  });
});

module.exports = router;
