const router = require("express").Router();
const Controller= require("./user.controller");

router.post("/",(req,res,next)=>{
console.log("Here", req.body)
  Controller.save(req.body);  
});

module.exports = router;
