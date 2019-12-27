const router = require("express").Router();
const astroRouter = require("../modules/astrology/astrology.routes.api");

router.use("/astro", astroRouter);

module.exports = router;
