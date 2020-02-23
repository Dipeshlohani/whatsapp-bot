const router = require("express").Router();
const astroRouter = require("../modules/astrology/astrology.routes.api");
const cronRouter = require("../modules/crons/crons.routes.api");

router.use("/astro", astroRouter);
router.use("/cron", cronRouter);

module.exports = router;
