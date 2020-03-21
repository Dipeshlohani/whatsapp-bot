const router = require("express").Router();
const cronHandler = require("../../services/cronHandler");

router.get("/save_all_star_nakshatras", async (req, res, next) => {
    try {
    await cronHandler.getAllNakshatras();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

router.get("/user_detail_tts", async (req, res, next) => {
  try {
    await cronHandler.userDetailTTS();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

router.get("/config_tts", async (req, res, next) => {
  try {
    await cronHandler.configTTS();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

router.get("/combile_tts", async (req, res, next) => {
  try {
    await cronHandler.combineTTS();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

router.get("/save_audio_files", async (req, res, next) => {
  try {
    await cronHandler.saveAudiofiles();
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
  }
});

router.get("/send_notification_to_messenger", (req, res, next) => {
   cronHandler.sendNotificationToMessenger().then(d=> res.sendStatus(200)).catch(e=> next);
 });

module.exports = router;
