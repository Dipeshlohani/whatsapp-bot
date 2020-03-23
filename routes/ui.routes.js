const router = require("express").Router();
const SecureUI=require("../utils/secureUI");


router.get("/",SecureUI(), (req, res, next) => {
  res.render("users");
});
router.get("/login", function(req, res, next) {
  console.log("hello");
  res.render("login", { title: "AI pandit Login" });
});
router.get("/logout", async (req, res, next) => {
  res.clearCookie("token");
  res.redirect("/login");
});
router.get("/config",SecureUI(), (req, res, next) => {
  res.render("config");
});

router.get("/user/add", (req, res, next) => {
  res.render("manualAdd");
});

router.get("/nakshatra",SecureUI(), (req, res, next) => {
  res.render("nakshatra");
});

router.get("/nakshatralist/:id",SecureUI(), (req, res, next) => {
  const nakshatra_id = req.params.id;
  res.render("updatesentiment.ejs", {
    nakshatra_id
  });
});

module.exports = router;
