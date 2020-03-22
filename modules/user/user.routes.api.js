const router = require("express").Router();
const Controller = require("./user.controller");
const SecureAPI=require("../../utils/secureAPI");

router.get("/",SecureAPI(), async (req, res, next) => {
  let limit = parseInt(req.query.limit) || 25;
  let start = parseInt(req.query.start) || 0;
  let page = parseInt(start) / parseInt(limit) + 1;
  let data = await Controller.list({ limit, start, page });
  try {
    res.json(data);
  } catch (e) {
    return e;
  }
});


router.post("/config/update",SecureAPI(),(req,res,next)=>{
  Controller.updateConfig(req.body)
  .then(d=>{ res.json(d) })
  .catch(e=>{console.log(e) })
});

router.post("/", (req, res, next) => {
  Controller.saveUser(req.body)
    .then(d => res.json(d))
    .catch(e => console.log(e));
});

module.exports = router;
