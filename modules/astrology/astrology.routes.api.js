const router = require("express").Router();
const Controller = require("./astrology.controller.js");

router.patch("/flag/update/:id", async (req, res, next) => {
  let id = req.params.id;
  let payload = req.body;
  try {
    const data = await Controller.updateSentiment({ id, payload });
    return res.sendStatus(200);
  } catch (e) {
    return res.json(e);
  }
});

module.exports = router;
