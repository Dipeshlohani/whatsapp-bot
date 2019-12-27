const mongoose = require("mongoose");
const config = require("config");
mongoose.connect(config.get("db.url"), {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
const facebook = require("./facebook");
const UserModal = require("../modules/user/user.model");
const APIUtils = require("../modules/welcome/welcome.utils");
const twilioNotify = require("./twilio");
const NakshatraModel = require("../modules/astrology/nakshatra.model");
const sampleData = require("../stars.json");
const access_token = config.get("fbpage_token.access_token");
const FB = new facebook({ access_token });
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

const sendNotificationToMessenger = async () => {
  let users = await UserModal.find({});
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
