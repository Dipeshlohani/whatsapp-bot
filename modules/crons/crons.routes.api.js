const router = require("express").Router();
const cronHandler = require("../../services/cronHandler");

router.get("/save_all_star_nakshatras", async (req, res, next) => {
  cronHandler
    .getAllNakshatras()
    .then(d => {
      res.sendStatus(200);
    })
    .catch(e =>  next(e));
});

router.get("/user_detail_tts", async (req, res, next) => {
  cronHandler
    .userDetailTTS()
    .then(d => {
      res.sendStatus(200);
    })
    .catch(e => { next(e)});
});

router.get("/config_tts", async (req, res, next) => {
  cronHandler
    .configTTS()
    .then(d => {
      res.sendStatus(200);
    })
    .catch(e => {next(e)});
});

router.get("/combile_tts", async (req, res, next) => {
     cronHandler
       .combineTTS()
       .then(d => {
         res.sendStatus(200);
       })
       .catch(e => {next(e)});
});

router.get("/save_audio_files", async (req, res, next) => {
 cronHandler.saveAudiofiles().then(d=>{ res.sendStatus(200)}).catch(e=>{ next(e)});
});

router.get("/send_notification_to_messenger", (req, res, next) => {
  cronHandler
    .sendNotificationToMessenger()
    .then(d => res.sendStatus(200))
    .catch(e => next(e));
});

module.exports = router;
