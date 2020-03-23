const router = require("express").Router();
const Controller = require("./astrology.controller.js");
const SecureAPI=require("../../utils/secureUI.js");
router.patch("/flag/update/:id",SecureAPI(), async (req, res, next) => {
  let id = req.params.id;
  let payload = req.body;
  try {
    const data = await Controller.updateSentiment({ id, payload });
    res.sendStatus(200);
  } catch (e) {
    return res.json(e);
  }
});
router.get("/",SecureAPI(), async (req, res, next) => {
  let limit = parseInt(req.query.limit) || 27;
  let start = parseInt(req.query.start) || 0;
  let page = parseInt(start) / parseInt(limit) + 1;
  let data = await Controller.get({ limit, start, page });
  try {
    res.json(data);
  } catch (e) {
    return e;
  }
});
router.get("/:id",SecureAPI(), async (req, res, next) => {
  const data = await Controller.getById(req.params.id);
  try {
    res.json(data);
  } catch (e) {
    return e;
  }
});

module.exports = router;
