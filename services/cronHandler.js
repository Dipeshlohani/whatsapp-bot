const mongoose = require("mongoose");
const config = require("config");
mongoose.connect(config.get("db.url"), {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
const facebook = require("./facebook");
const UserModel = require("../modules/user/user.model");
const APIUtils = require("../modules/welcome/welcome.utils");
const twilioNotify = require("./twilio");
const NakshatraModel = require("../modules/astrology/nakshatra.model");
const sampleData = require("../stars.json");
const access_token = config.get("fbpage_token.access_token");
const FB = new facebook({ access_token });

const fs = require("fs");

const setUsersNakshatra = async () => {
  let users = await UserModal.aggregate([
    {
      $project: {
        _id: 1,
        dob: 1,
        pob: 1
      }
    }
  ]);
  for (let user of users) {
    let { _id, pob, dob } = user;
    let data = await APIUtils.getDailyNakshatraPrediction({ pob, dob });

    data.user = _id;
    await NakshatraModel.create(data);
  }
  return;
};

const saveAllStarNakshatras = async () => {
  //to save 27 stars nakshatra
  for (let i of sampleData) {
    let data = await APIUtils.getDailyNakshatraPrediction(i);
    await NakshatraModel.findOneAndUpdate(
      { birth_moon_nakshatra: data.birth_moon_nakshatra },
      data,
      { upsert: true, new: true }
    );
  }
  process.exit();
};

// let obj = {
//   "asservachanam-part1": "asservachanam-part1.wav",
//   "asservachanam-part2": "asservachanam-part1.wav",
//   "asservachanam-part3": "asservachanam-part3.wav",
//   conclusion: "conclusion.wav",
//   emotions_excellent: "emotions_excellent.wav",
//   emotions_negative: "emotions_negative.wav",
//   emotions_average: "emotions_average.wav",
//   health_average: "health_average.wav",
//   health_excellent: "health_excellent.wav",
//   health_negative: "health_negative.wav",
//   intro: "intro.wav",
//   luck_average: "luck_average.wav",
//   luck_excellent: "luck_average.wav",
//   luck_negative: "luck_negative.wav",
//   "personal-life-average": "personal-life-average.wav",
//   "personal-life-excellent": "personal-life-excellent.wav",
//   "personal-life-negative": "personal-life-negative.wav",
//   "prayer-part7": "prayer-part7.wav",
//   profession_average: "profession_average.wav",
//   profession_excellent: "profession_excellent.wav",
//   profession_negative: "profession_negative.wav",
//   s1: "s1.wav",
//   s2: "s2.wav",
//   s3: "s3.wav",
//   s4: "s4.wav",
//   s5: "s5.wav",
//   s6: "s6.wav",
//   s7: "s7.wav",
//   s8: "s8.wav",
//   s9: "s9.wav",
//   s10: "s10.wav",
//   s11: "s11.wav",
//   "travel-average": "travel-average.wav",
//   "sankalpam-part2": "sankalpam-part2.wav",
//   "travel-average": "travel-average.wav",
//   "travel-excellent": "travel-excellent.wav",
//   "travel-negative": "travel-negative.wav"
// };

// const combineUsersPrayer = () => {
//    let users = await UserModel.find({});
//   for (let user of users) {
//     let data = await NakshatraModel.findOne({
//       birth_moon_nakshatra: user.birth_moon_nakshatra
//     });
//     let PSID = user.fbmsn_id;
//     let { sentiment } = data;
//     let{ health, luck,  travel, emotion, personal_life, profession}  = sentiment;
//     if(health == "negative") health = "health_average.wav";
//     if(health == "average") health = "health_average.wav";
//     if(health == "excellent") health = "health_average.wav";
//     if(personal_life == "average") personal_life = "personal_life.wav";
//     if(personal_life == "excellent") personal_life = "personal_life.wav";
//     if(personal_life == "negative") personal_life = "personal_life.wav";
//     if(travel == "average") travel = "travel-average.wav";
//     if(travel == "excellent") travel = "travel-excellent.wav";
//     if(travel == "negative") travel = "travel-negative.wav";
//     if(emotion == "excellent") emotion = "emotion.wav";
//     if(emotion == "average") emotion = "emotion.wav";
//     if(emotion == "negative") emotion = "emotion.wav";

//       return {  health, luck,  travel, emotion, personal_life, profession };

// };

const sendNotificationToMessenger = async () => {
  let users = await UserModel.find({});
  for (let user of users) {
    let data = await NakshatraModel.findOne({
      birth_moon_nakshatra: user.birth_moon_nakshatra
    });
    let PSID = user.fbmsn_id;
    let { prediction } = data;

    let message = `Hi ${user.name} here are your prediction for today. \n 1) Health: ${prediction.health} \n 2) Emotions:${prediction.emotions} \n 3) Profession: ${prediction.profession} \n  4) Luck: ${prediction.luck} \n  5) Personal Life: ${prediction.personal_life} \n 6) Travel: ${prediction.travel} `;
    await FB.sendMessage({ message, PSID });
  }
  process.exit();
};

const sendNakshatraNotification = async () => {
  let users = await NakshatraModel.find({}).populate("user", "phone name");
  // prediction_date: { $gte: new Date(2019, 12, 19) }
  // console.log(users);
  users.forEach(async elem => {
    let { user, prediction, prediction_date } = elem;
    let { phone, name } = user;

    // prediction_date = new Date(prediction_date).toLocaleString();

    // if (prediction_date.getTime() === Date.now().getTime()) {
    //   console.log("date match");
    // } else {
    //   console.log("date doesnt match");
    // }
    // console.log(prediction_date);
    let message = `Hi ${name} here are your prediction for today. \n 1) Health: ${prediction.health} \n 2) Emotions:${prediction.emotions} \n 3) Profession: ${prediction.profession} \n  4) Luck: ${prediction.luck} \n  5) Personal Life: ${prediction.personal_life} \n 6) Travel: ${prediction.travel} `;

    await twilioNotify.sendSingleMessage(phone, message);
  });
};

// setUsersNakshatra();
// sendNakshatraNotification();
// saveAllStarNakshatras();
// sendNotificationToMessenger();
readfile();
