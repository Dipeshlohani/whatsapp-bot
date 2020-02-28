const router = require("express").Router();

router.get("/", (req, res, next) => {
  res.render("index");
});

router.get("/config", (req, res, next) => {
  res.render("config");
});

router.get("/userlist", (req, res, next) => {
  res.render("userlist");
});
router.get("/user/add", (req, res, next) => {
  res.render("index");
});

router.get("/config", (req, res, next) => {
  res.render("config");
});
router.get("/nakshatralist", (req, res, next) => {
  res.render("nakshatralist");
});

router.get("/nakshatralist/:id", (req, res, next) => {
  const nakshatra_id = req.params.id;
  res.render("updatesentiment.ejs", {
    nakshatra_id
  });
});

module.exports = router;
