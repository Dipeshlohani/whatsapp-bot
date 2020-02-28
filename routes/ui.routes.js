const router = require("express").Router();

router.get("/", (req,res,next) =>{
    res.render("users");
});

router.get("/user/add",(req,res,next)=>{
  res.render("index");
});

router.get("/config", (req, res, next) => {
  res.render("config");
});

module.exports = router;