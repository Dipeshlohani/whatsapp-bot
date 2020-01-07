const router = require("express").Router();
const cronHandler = require("../../services/cronHandler");

router.get("/save_all_star_nakshatras", async (req, res, next) => {
  try {
    const data = await cronHandler.saveNakshatras();
    return res.sendStatus(200);
  } catch (e) {
    return res.json(e);
  }
});

router.get("/user_detail_tts", async (req, res, next) => {
  try {
    const data = await cronHandler.userDetailTTS();
    return res.sendStatus(200);
  } catch (e) {
    return res.json(e);
  }
});

router.get("/config_tts", async (req, res, next) => {
  try {
    const data = await cronHandler.configTTS();
    return res.sendStatus(200);
  } catch (e) {
    return res.json(e);
  }
});

router.get("/combile_tts", async (req, res, next) => {
  try {
    const data = await cronHandler.combineTTS();
    return res.sendStatus(200);
  } catch (e) {
    return res.json(e);
  }
});

router.get("/save_audio_files", async (req, res, next) => {
  try {
    const data = await cronHandler.saveAudiofiles();
    return res.sendStatus(200);
  } catch (e) {
    return res.json(e);
  }
});

router.get("/send_notification_to_messenger", async (req, res, next) => {
  try {
    const data = await cronHandler.sendNotificationToMessenger();
    return res.sendStatus(200);
  } catch (e) {
    return res.json(e);
  }
});

module.exports = router;
