const router = require("express").Router();
const astroRouter = require("../modules/astrology/astrology.routes.api");
const cronRouter = require("../modules/crons/crons.routes.api");
const userRouter = require("../modules/user/user.routes.api");
const adminRouter=require("../modules/admin/admin.routes.api");

router.use("/admin",adminRouter);
router.use("/astro", astroRouter);
router.use("/cron", cronRouter);
router.use("/user", userRouter);

module.exports = router;
