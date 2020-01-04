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
const { exec } = require("child_process");
const AWS = require("./aws_s3");

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

const saveAudiofiles = async () => {
  let users = await UserModel.find({});
  for (let user of users) {
    let data = await NakshatraModel.findOne({
      birth_moon_nakshatra: user.birth_moon_nakshatra
    });
    let { sentiment } = data;
    let command = `ffmpeg -i F:/upwork/whatsapp-bot/assets/audios/intro.wav -i F:/upwork/whatsapp-bot/assets/users/${user._id}/Sankalpampart1.wav -i F:/upwork/whatsapp-bot/assets/audios/sankalpam-part2.wav`;
    switch (sentiment.health) {
      case "excellent":
        command += ` -i \t F:/upwork/whatsapp-bot/assets/audios/health_excellent.wav`;
        break;
      case "average":
        command += ` -i \t F:/upwork/whatsapp-bot/assets/audios/health_average.wav`;
        break;
      case "negative":
        command += ` -i \t F:/upwork/whatsapp-bot/assets/audios/health_negative.wav`;
        break;
      default:
        break;
    }
    switch (sentiment.emotions) {
      case "excellent":
        command += ` -i F:/upwork/whatsapp-bot/assets/audios/emotions_excellent.wav`;
        break;
      case "average":
        command += ` -i F:/upwork/whatsapp-bot/assets/audios/emotions_average.wav`;
        break;
      case "negative":
        command += ` -i F:/upwork/whatsapp-bot/assets/audios/emotions_negative.wav`;
        break;
      default:
        break;
    }
    switch (sentiment.profession) {
      case "excellent":
        command += ` -i F:/upwork/whatsapp-bot/assets/audios/profession_excellent.wav`;
        break;
      case "average":
        command += ` -i F:/upwork/whatsapp-bot/assets/audios/profession_average.wav`;
        break;
      case "negative":
        command += ` -i F:/upwork/whatsapp-bot/assets/audios/profession_negative.wav`;
        break;
      default:
        break;
    }
    switch (sentiment.luck) {
      case "excellent":
        command += ` -i \t F:/upwork/whatsapp-bot/assets/audios/luck_excellent.wav`;
        break;
      case "average":
        command += ` -i \t F:/upwork/whatsapp-bot/assets/audios/luck_average.wav`;
        break;
      case "negative":
        command += ` -i \t F:/upwork/whatsapp-bot/assets/audios/luck_negative.wav`;
        break;
      default:
        break;
    }
    switch (sentiment.personal_life) {
      case "excellent":
        command += ` -i F:/upwork/whatsapp-bot/assets/audios/personal-life-excellent.wav`;
        break;
      case "average":
        command += ` -i F:/upwork/whatsapp-bot/assets/audios/personal-life-average.wav`;
        break;
      case "negative":
        command += ` -i F:/upwork/whatsapp-bot/assets/audios/personal-life-negative.wav`;
        break;
      default:
        break;
    }
    switch (sentiment.travel) {
      case "excellent":
        command += ` -i F:/upwork/whatsapp-bot/assets/audios/travel-excellent.wav`;
        break;
      case "average":
        command += ` -i F:/upwork/whatsapp-bot/assets/audios/travel-average.wav`;
        break;
      case "negative":
        command += ` -i F:/upwork/whatsapp-bot/assets/audios/travel-negative.wav`;
        break;
      default:
        break;
    }
    command += ` -i F:/upwork/whatsapp-bot/assets/audios/prayer-part7.wav -i F:/upwork/whatsapp-bot/assets/audios/asservachanam-part1.wav  -i F:/upwork/whatsapp-bot/assets/audios/asservachanam-part2.wav -i F:/upwork/whatsapp-bot/assets/audios/asservachanam-part3.wav -i F:/upwork/whatsapp-bot/assets/audios/conclusion.wav -filter_complex [0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0][10:0][11:0][12:0]concat=n=13:v=0:a=1[out]  -map [out] F:/upwork/whatsapp-bot/assets/audios/prayer_${
      user.fbmsn_id
    }_${new Date(data.prediction_date).toLocaleDateString()}.wav`;
    //command delete local file
    let audioname = `prayer_${user.fbmsn_id}_${new Date(
      data.prediction_date
    ).toLocaleDateString()}.wav`;
    combine(command, function() {
      AWS.save(audioname);
    });
  }

  // process.exit();
};

const userDetailTTS = async () => {
  let voice = `en+m3`;
  let users = await UserModel.find({});
  for (let user of users) {
    let { currentLocation, gothra, birth_moon_sign, birth_moon_nakshatra, name, _id } = user;
    let { place } = currentLocation;
    let obj = { place, gothra, birth_moon_sign, birth_moon_nakshatra, name };

    fs.mkdir(
      __dirname + `/../assets/users/${_id}`,
      { recursive: true },
      function() {
        Object.keys(obj).forEach(el => {
          let file = `${el}.wav`;
          command = `espeak.exe -v ${voice} -s 120 -w ./assets/users/${_id}/${file} "${obj[el]}"`;
          combine(command, function() {
            return;
          });
        });
      },
      err => {
        if (err) throw err;
      }
    );
  }
};

const configTTS = async () => {
  // const { exec } = require("child_process");
  let voice = `en+m3`;
  let filename = "/config/sankalpam.json";
  let content = fs.readFileSync(process.cwd() + "/" + filename).toString();

  Object.keys(JSON.parse(content)).forEach(el => {
    let file = `${el}.wav`;
    var command = `espeak.exe -v ${voice} -s 120 -w ./assets/default/${file} "${
      JSON.parse(content)[el]
    }"`;
    combine(command, function() {
      return;
    });
  });

  // let voice = `en+m3`;

  // let file = "sankalpampart1.wav";
  // const { exec } = require("child_process");
  // var command = `espeak.exe -v ${voice} -s 120 -w ${file} "${text}"`;

  // exec(command, (err, stdout, stderr) => {
  //   if (err) {
  //     console.log("Error occurred: ", err);
  //     return;
  //   }
  //   if (stdout) {
  //     console.log("stdout occurred: ", err);
  //     return;
  //   }
  //   if (stderr) {
  //     console.log("stderr occurred: ", err);
  //     return;
  //   }
  // });
};
const combineTTS = async () => {
  let users = await UserModel.find({});
  for (let user of users) {
    let { _id } = user;
    let command = `ffmpeg -i F:/upwork/whatsapp-bot/assets/audios/s1.wav -i F:/upwork/whatsapp-bot/assets/default/YEAR.wav -i F:/upwork/whatsapp-bot/assets/audios/s2.wav -i F:/upwork/whatsapp-bot/assets/default/MONTH.wav -i F:/upwork/whatsapp-bot/assets/audios/s3.wav -i F:/upwork/whatsapp-bot/assets/default/PAKSHA.wav -i F:/upwork/whatsapp-bot/assets/audios/s4.wav -i F:/upwork/whatsapp-bot/assets/default/THITHI.wav -i F:/upwork/whatsapp-bot/assets/audios/s5.wav -i F:/upwork/whatsapp-bot/assets/default/WEEK.wav -i F:/upwork/whatsapp-bot/assets/audios/s6.wav -i F:/upwork/whatsapp-bot/assets/users/${_id}/place.wav -i F:/upwork/whatsapp-bot/assets/audios/s7.wav -i F:/upwork/whatsapp-bot/assets/users/${_id}/gothra.wav -i F:/upwork/whatsapp-bot/assets/audios/s8.wav -i F:/upwork/whatsapp-bot/assets/users/${_id}/birth_moon_sign.wav -i F:/upwork/whatsapp-bot/assets/audios/s9.wav -i F:/upwork/whatsapp-bot/assets/users/${_id}/birth_moon_nakshatra.wav -i F:/upwork/whatsapp-bot/assets/audios/s10.wav -i F:/upwork/whatsapp-bot/assets/users/${_id}/name.wav -i F:/upwork/whatsapp-bot/assets/audios/s11.wav -filter_complex [0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0][10:0][11:0][12:0][13:0][14:0][15:0][16:0][17:0][18:0][19:0][20:0]concat=n=21:v=0:a=1[out]  -map [out] F:/upwork/whatsapp-bot/assets/users/${_id}/Sankalpampart1.wav`;
    combine(command, function() {
      return;
    });
  }
};
function combine(command, cb) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      cb(stderr);
    } else {
      cb(stdout);
    }
  });
}

const sendNotificationToMessenger = async () => {
  let users = await UserModel.find({});
  for (let user of users) {
    let data = await NakshatraModel.findOne({
      birth_moon_nakshatra: user.birth_moon_nakshatra
    });
    // console.log(new Date().toLocaleDateString());
    if (new Date(data.prediction_date).toLocaleDateString() == new Date().toLocaleDateString()) {
      let PSID = user.fbmsn_id;
      let { prediction } = data;
      let payload;

      let message = `Hi ${user.name} here are your prediction for today. \n 1) Health: ${prediction.health} \n 2) Emotions:${prediction.emotions} \n 3) Profession: ${prediction.profession} \n  4) Luck: ${prediction.luck} \n  5) Personal Life: ${prediction.personal_life} \n 6) Travel: ${prediction.travel} `;

      payload = {
        id: PSID,
        text: message
      };
      await FB.sendMessage(payload);
      let message2 = `Here is a customized prayer for you. This prayer is from you to Almighty to thank him for the positive predictions, guide you for average predictions and help you to overcome the negative predictions with human will. You can chat the prayer along with the voice.`;
      payload = {
        id: PSID,
        text: message2
      };
      await FB.sendMessage(payload);
      payload = {
        id: PSID,
        attachment: {
          type: "audio",
          payload: {
            url: `https://cxb1.s3.amazonaws.com/aipundit/prayer_${user.fbmsn_id}_${new Date(
              data.prediction_date
            ).toLocaleDateString()}.wav`,
            is_reusable: true
          }
        }
      };
      await FB.sendMessage(payload);
    }
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
// saveAudiofiles();
// combineTTS();
userDetailTTS();
