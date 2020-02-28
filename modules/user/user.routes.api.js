const router = require("express").Router();
const Controller = require("./user.controller");

router.post("/", (req, res, next) => {
  console.log("Here", req.body);
  Controller.save(req.body);
});
router.get("/", async (req, res, next) => {
  let limit = parseInt(req.query.limit) || 25;
  let start = parseInt(req.query.start) || 0;
  let page = parseInt(start) / parseInt(limit) + 1;
  let data = await Controller.get({ limit, start, page });
  try {
    res.json(data);
  } catch (e) {
    return e;
  }
});
router.get("/:id", async (req, res, next) => {});
router.post("/config/update", (req, res, next) => {
  Controller.updateConfig(req.body)
    .then(d => {
      res.json(d);
    })
    .catch(e => {
      console.log(e);
    });
});

module.exports = router;
