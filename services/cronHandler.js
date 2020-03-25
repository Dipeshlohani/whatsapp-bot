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
    if(!users.length) throw Error("Users Not Found");
    for (let user of users) {
      let { _id, pob, dob } = user;
      let data = await APIUtils.getDailyNakshatraPrediction({ pob, dob });

      data.user = _id;
      await NakshatraModel.create(data);
    }
    return true;
 };

const getAllNakshatras = () => {
  return nakshatraAPI();
};

const nakshatraAPI = async () => {	
    if(!sampleData.length) throw Error("Sample data not found!");
    for (let i of sampleData) {
      let data = await APIUtils.getDailyNakshatraPrediction(i);
      await NakshatraModel.findOneAndUpdate(
        { birth_moon_nakshatra: data.birth_moon_nakshatra },
        data,
        { upsert: true, new: true }
      )
    }
   return true;
  }


const saveAudiofiles = async () => {
  try {
    console.log("================================DIRNAME==========================="+__dirname);
    let users = await UserModel.find({});
    for (let user of users) {
      let data = await NakshatraModel.findOne({
        birth_moon_nakshatra: user.birth_moon_nakshatra
      });
      let { sentiment } = data;
      let command = `ffmpeg -i /root/projects/whatsapp-bot/assets/audios/intro.wav -i /root/projects/whatsapp-bot/assets/users/${user._id}/Sankalpampart1.wav -i /root/projects/whatsapp-bot/assets/audios/sankalpam-part2.wav`;
      switch (sentiment.health) {
        case "excellent":
          command += ` -i \t /root/projects/whatsapp-bot/assets/audios/health_excellent.wav`;
          break;
        case "average":
          command += ` -i \t /root/projects/whatsapp-bot/assets/audios/health_average.wav`;
          break;
        case "negative":
          command += ` -i \t /root/projects/whatsapp-bot/assets/audios/health_negative.wav`;
          break;
        default:
          break;
      }
      switch (sentiment.emotions) {
        case "excellent":
          command += ` -i /root/projects/whatsapp-bot/assets/audios/emotions_excellent.wav`;
          break;
        case "average":
          command += ` -i /root/projects/whatsapp-bot/assets/audios/emotions_average.wav`;
          break;
        case "negative":
          command += ` -i /root/projects/whatsapp-bot/assets/audios/emotions_negative.wav`;
          break;
        default:
          break;
      }
      switch (sentiment.profession) {
        case "excellent":
          command += ` -i /root/projects/whatsapp-bot/assets/audios/profession_excellent.wav`;
          break;
        case "average":
          command += ` -i /root/projects/whatsapp-bot/assets/audios/profession_average.wav`;
          	;
        case "negative":
          command += ` -i /root/projects/whatsapp-bot/assets/audios/profession_negative.wav`;
          break;
        default:
          break;
      }
      switch (sentiment.luck) {
        case "excellent":
          command += ` -i \t /root/projects/whatsapp-bot/assets/audios/luck_excellent.wav`;
          break;
        case "average":
          command += ` -i \t /root/projects/whatsapp-bot/assets/audios/luck_average.wav`;
          break;
        case "negative":
          command += ` -i \t /root/projects/whatsapp-bot/assets/audios/luck_negative.wav`;
          break;
        default:
          break;
      }
      switch (sentiment.personal_life) {
        case "excellent":
          command += ` -i /root/projects/whatsapp-bot/assets/audios/personal-life-excellent.wav`;
          break;
        case "average":
          command += ` -i /root/projects/whatsapp-bot/assets/audios/personal-life-average.wav`;
          break;
        case "negative":
          command += ` -i /root/projects/whatsapp-bot/assets/audios/personal-life-negative.wav`;
          break;
        default:
          break;
      }
      switch (sentiment.travel) {
        case "excellent":
          command += ` -i /root/projects/whatsapp-bot/assets/audios/travel-excellent.wav`;
          break;
        case "average":
          command += ` -i /root/projects/whatsapp-bot/assets/audios/travel-average.wav`;
          break;
        case "negative":
          command += ` -i /root/projects/whatsapp-bot/assets/audios/travel-negative.wav`;
          break;
        default:
          break;
      }
      command += ` -i /root/projects/whatsapp-bot/assets/audios/prayer-part7.wav -i /root/projects/whatsapp-bot/assets/audios/asservachanam-part1.wav  -i /root/projects/whatsapp-bot/assets/audios/asservachanam-part2.wav -i /root/projects/whatsapp-bot/assets/audios/asservachanam-part3.wav -i /root/projects/whatsapp-bot/assets/audios/conclusion.wav -filter_complex [0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0][10:0][11:0][12:0][13:0]concat=n=14:v=0:a=1[out]  -map [out] /root/projects/whatsapp-bot/assets/audios/prayer_${
        user.fbmsn_id
      }_${new Date(data.prediction_date).getTime()}.wav`;

      let audioname = `prayer_${user.fbmsn_id}_${new Date(
        data.prediction_date
      ).getTime()}.wav`;
      combine(command, function() {
        AWS.save(audioname);
      });
    }

    return 200;
  } catch (e) {
	console.log(e);
    return e;
  }
};

const userDetailTTS = async data => {
  try {
    let voice = `en+m3`;
    let { currentLocation, gothra, birth_moon_sign, birth_moon_nakshatra, name, _id } = data;
    let { place } = currentLocation;
    let obj = { place, gothra, birth_moon_sign, birth_moon_nakshatra, name };

    fs.mkdir(
      `/root/projects/whatsapp-bot/assets/users/${_id}`,
      { recursive: true },
      function() {
        Object.keys(obj).forEach(el => {
          let file = `${el}.wav`;
          command = `espeak -v ${voice} -s 120 -w /root/projects/whatsapp-bot/assets/users/${_id}/${file} "${obj[el]}"`;
          combine(command, function() {
            return;
          });
        });
      },
      err => {
        if (err) throw err;
      }
    );

    return true;
  } catch (e) {
    console.log(e);
    return e;
  }
};

const configTTS = async () => {
try {
 let voice = `en+m3`;
    let filename = "/root/projects/whatsapp-bot/config/sankalpam.json";
    let content = fs.readFileSync(filename).toString();
    Object.keys(JSON.parse(content)).forEach(el => {
      let file = `${el}.wav`;
      let command = `espeak -v ${voice} -s 120 -w /root/projects/whatsapp-bot/assets/default/${file} "${
        JSON.parse(content)[el]
      }"`;
      combine(command, function() {
        return;
      });
    });
    return true;
} catch(e) {
console.log(e);	
return e;
}
   
};

const combineTTS = async (data) => {
  try {
      let { _id } = data;
      let command = `ffmpeg -i /root/projects/whatsapp-bot/assets/audios/s1.wav -i /root/projects/whatsapp-bot/assets/default/YEAR.wav -i /root/projects/whatsapp-bot/assets/audios/s2.wav -i /root/projects/whatsapp-bot/assets/default/MONTH.wav -i /root/projects/whatsapp-bot/assets/audios/s3.wav -i /root/projects/whatsapp-bot/assets/default/PAKSHA.wav -i /root/projects/whatsapp-bot/assets/audios/s4.wav -i /root/projects/whatsapp-bot/assets/default/THITHI.wav -i /root/projects/whatsapp-bot/assets/audios/s5.wav -i /root/projects/whatsapp-bot/assets/default/WEEK.wav -i /root/projects/whatsapp-bot/assets/audios/s6.wav -i /root/projects/whatsapp-bot/assets/users/${_id}/place.wav -i /root/projects/whatsapp-bot/assets/audios/s7.wav -i /root/projects/whatsapp-bot/assets/users/${_id}/gothra.wav -i /root/projects/whatsapp-bot/assets/audios/s8.wav -i /root/projects/whatsapp-bot/assets/users/${_id}/birth_moon_sign.wav -i /root/projects/whatsapp-bot/assets/audios/s9.wav -i /root/projects/whatsapp-bot/assets/users/${_id}/birth_moon_nakshatra.wav -i /root/projects/whatsapp-bot/assets/audios/s10.wav -i /root/projects/whatsapp-bot/assets/users/${_id}/name.wav -i /root/projects/whatsapp-bot/assets/audios/s11.wav -filter_complex [0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0][10:0][11:0][12:0][13:0][14:0][15:0][16:0][17:0][18:0][19:0][20:0]concat=n=21:v=0:a=1[out]  -map [out] /root/projects/whatsapp-bot/assets/users/${_id}/Sankalpampart1.wav`;
      combine(command, function() {
        return;
      });
    return true;
  } catch (e) {
    console.log(e);
    return e;
  }
};

function combine(command, cb) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.log(error);
      console.log(stdout);
      console.log(stderr);
      cb(stderr);
    } else {
      cb(stdout);
    }
  });
}

const sendNotificationToMessenger = async () => {
    let users = await UserModel.find({});
    if(!users.length) throw Error("Users Not Found");
    for (let user of users) {
      if (users.isActive === true) {
        let data = await NakshatraModel.findOne({
          birth_moon_nakshatra: user.birth_moon_nakshatra
        });
        if (
          new Date(data.prediction_date).toLocaleDateString() ==
          new Date().toLocaleDateString()
        ) {
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
                url: `https://cxb1.s3.amazonaws.com/aipundit/prayer_${
                  user.fbmsn_id
                }_${new Date(data.prediction_date).getTime()}.wav`,
                is_reusable: true
              }
            }
          };
          await FB.sendMessage(payload);
        }
      }
    }
    return true;
};


const sendNakshatraNotification = async () => {
    let users = await NakshatraModel.find({}).populate("user", "phone name");
    if(!users.length) throw Error("Users Not Found");
    users.forEach(async elem => {
      let { user, prediction, prediction_date } = elem;
      let { phone, name } = user;

      let message = `Hi ${name} here are your prediction for today. \n 1) Health: ${prediction.health} \n 2) Emotions:${prediction.emotions} \n 3) Profession: ${prediction.profession} \n  4) Luck: ${prediction.luck} \n  5) Personal Life: ${prediction.personal_life} \n 6) Travel: ${prediction.travel} `;

      await twilioNotify.sendSingleMessage(phone, message);
    });
    return true;
};

 module.exports = { getAllNakshatras, userDetailTTS, configTTS,  combineTTS, saveAudiofiles, sendNotificationToMessenger};