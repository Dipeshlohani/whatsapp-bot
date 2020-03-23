const router = require("express").Router();

const apiRouter = require("./api.routes");
const botRouter = require("./bot");
const uiRouter = require("./ui.routes");


router.use("/",uiRouter)
router.use("/api/v1", apiRouter);
router.use("/bot", botRouter);


module.exports = router;
