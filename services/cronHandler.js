const mongoose = require("mongoose");
const config = require("config");
mongoose.connect(config.get("db.url"), {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
const UserModal = require("../modules/user/user.model");
const APIUtils = require("../modules/welcome/welcome.utils");
const twilioNotify = require("./twilio");
const AstroModel = require("../modules/astrology/astrology.model");

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
    await AstroModel.create(data);
  }
  process.exit();
};

const sendNakshatraNotification = async () => {
  let users = await AstroModel.find({
    prediction_date: { $gte: new Date(2019, 12, 19) }
  }).populate("user", "phone name");
  console.log(users);
  //  {"created_on": {"$gte": new Date(2012, 7, 14), "$lt": new Date(2012, 7, 15)}}
  // users.forEach(async elem => {
  //   let { user, prediction, prediction_date } = elem;
  //   let { phone, name } = user;

  //   prediction_date = new Date(prediction_date).toLocaleString();

  //   if (prediction_date.getTime() === Date.now().getTime()) {
  //     console.log("date match");
  //   } else {
  //     console.log("date doesnt match");
  //   }
  //   console.log(prediction_date);
  //   // let message = `Hi ${name} here are your prediction for today. \n 1) Health: ${prediction.health} \n 2) Emotions:${prediction.emotions} \n 3) Profession: ${prediction.profession} \n  4) Luck: ${prediction.luck} \n  5) Personal Life: ${prediction.personal_life} \n 6) Travel: ${prediction.travel} `;

  //   // await twilioNotify.sendSingleMessage(phone, message);
  // });
};

// setUsersNakshatra();
sendNakshatraNotification();
// process.exit();
