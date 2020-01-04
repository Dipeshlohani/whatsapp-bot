const { exec } = require("child_process");
// const UserModel = require("./modules/user/user.model");
// const NakshatraModel = require("./modules/astrology/nakshatra.model");
// const mongoose = require("mongoose");
// const config = require("config");
// mongoose.connect(config.get("db.url"), {
//   useNewUrlParser: true,
//   useFindAndModify: false,
//   useUnifiedTopology: true
// });
// // "ffmpeg -i F:/upwork/whatsapp-bot/assets/audios/s1.wav -i F:/upwork/whatsapp-bot/assets/audios/s2.wav -i F:/upwork/whatsapp-bot/assets/audios/prayer-part7.wav -i F:/upwork/whatsapp-bot/assets/audios/asservachanam-part1.wav -i F:/upwork/whatsapp-bot/assets/audios/asservachanam-part2.wav -i F:/upwork/whatsapp-bot/assets/audios/asservachanam-part3.wav -i F:/upwork/whatsapp-bot/assets/audios/conclusion.wav  -filter_complex [0:0][1:0][2:0][3:0][4:0][5:0][6:0]concat=n=7:v=0:a=1[out]  -map [out] F:/output.wav";

// const saveAudiofiles = async () => {
//   let users = await UserModel.find({});
//   // console.log(users);
//   for (let user of users) {
//     let data = await NakshatraModel.findOne({
//       birth_moon_nakshatra: user.birth_moon_nakshatra
//     });
//     let { sentiment } = data;
//     let command = `ffmpeg -i F:/upwork/whatsapp-bot/assets/audios/intro.wav -i F:/upwork/whatsapp-bot/assets/audios/sankalpam-part2.wav`;
//     switch (sentiment.health) {
//       case "excellent":
//         command += ` -i \t F:/upwork/whatsapp-bot/assets/audios/health_excellent.wav`;
//         break;
//       case "average":
//         command += ` -i \t F:/upwork/whatsapp-bot/assets/audios/health_average.wav`;
//         break;
//       case "negative":
//         command += ` -i \t F:/upwork/whatsapp-bot/assets/audios/health_negative.wav`;
//         break;
//       default:
//         break;
//     }
//     switch (sentiment.emotions) {
//       case "excellent":
//         command += ` -i F:/upwork/whatsapp-bot/assets/audios/emotions_excellent.wav`;
//         break;
//       case "average":
//         command += ` -i F:/upwork/whatsapp-bot/assets/audios/emotions_average.wav`;
//         break;
//       case "negative":
//         command += ` -i F:/upwork/whatsapp-bot/assets/audios/emotions_negative.wav`;
//         break;
//       default:
//         break;
//     }
//     switch (sentiment.profession) {
//       case "excellent":
//         command += ` -i F:/upwork/whatsapp-bot/assets/audios/profession_excellent.wav`;
//         break;
//       case "average":
//         command += ` -i F:/upwork/whatsapp-bot/assets/audios/profession_average.wav`;
//         break;
//       case "negative":
//         command += ` -i F:/upwork/whatsapp-bot/assets/audios/profession_negative.wav`;
//         break;
//       default:
//         break;
//     }
//     switch (sentiment.luck) {
//       case "excellent":
//         command += ` -i \t F:/upwork/whatsapp-bot/assets/audios/luck_excellent.wav`;
//         break;
//       case "average":
//         command += ` -i \t F:/upwork/whatsapp-bot/assets/audios/luck_average.wav`;
//         break;
//       case "negative":
//         command += ` -i \t F:/upwork/whatsapp-bot/assets/audios/luck_negative.wav`;
//         break;
//       default:
//         break;
//     }
//     switch (sentiment.personal_life) {
//       case "excellent":
//         command += ` -i F:/upwork/whatsapp-bot/assets/audios/personal-life-excellent.wav`;
//         break;
//       case "average":
//         command += ` -i F:/upwork/whatsapp-bot/assets/audios/personal-life-average.wav`;
//         break;
//       case "negative":
//         command += ` -i F:/upwork/whatsapp-bot/assets/audios/personal-life-negative.wav`;
//         break;
//       default:
//         break;
//     }
//     switch (sentiment.travel) {
//       case "excellent":
//         command += ` -i F:/upwork/whatsapp-bot/assets/audios/travel-excellent.wav`;
//         break;
//       case "average":
//         command += ` -i F:/upwork/whatsapp-bot/assets/audios/travel-average.wav`;
//         break;
//       case "negative":
//         command += ` -i F:/upwork/whatsapp-bot/assets/audios/travel-negative.wav`;
//         break;
//       default:
//         break;
//     }
//     command += ` -i F:/upwork/whatsapp-bot/assets/audios/prayer-part7.wav -i F:/upwork/whatsapp-bot/assets/audios/asservachanam-part1.wav  -i F:/upwork/whatsapp-bot/assets/audios/asservachanam-part2.wav -i F:/upwork/whatsapp-bot/assets/audios/asservachanam-part3.wav -i F:/upwork/whatsapp-bot/assets/audios/conclusion.wav -filter_complex [0:0][1:0][2:0][3:0][4:0][5:0][6:0][7:0][8:0][9:0][10:0][11:0][12:0]concat=n=13:v=0:a=1[out]  -map [out] F:/output.wav`;
//     // await combineAudio(command);
//     // console.log(command);
//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//       }
//       if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//       }
//       console.log(`stdout: ${stdout}`);
//     });
//     // return command1;
//   }
// };

// saveAudiofiles();

//say
// var say = require("say");
// var voiceName = "Alex";

// say.speak("Hey What's your name?", voiceName, 1, err => {
//   if (err) {
//     return console.error(err);
//   }

//   console.log(`Text with the voice ${voice}`);
// });
// say.getInstalledVoices();
//google

// let command = "espeak -f Hi I am human --stdout > F:audio";

// function save() {
//   console.log("hello");
//   exec(command, (error, stdout, stderr) => {
//     if (error) {
//       console.log(`error: ${error.message}`);
//       return;
//     }
//     if (stderr) {
//       console.log(`stderr: ${stderr}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//   });
//   // return command1;
// }
// save();

let fs = require("fs");

let filename = "/config/sankalpam.json";
let content = fs.readFileSync(process.cwd() + "/" + filename).toString();
console.log(JSON.parse(content).YEAR);
// (async () => {
//   let voice = `en+m3`;
//   let text =
//     "Hi Krishna Chaitanya, here's the customized prayer for you. You will get this according to your gotra";
//   let file = "sankalpampart1.wav";
//   const { exec } = require("child_process");
//   var command = `espeak.exe -v ${voice} -s 120 -w ${file} "${text}"`;

//   exec(command, (err, stdout, stderr) => {
//     if (err) {
//       console.log("Error occurred: ", err);
//       return;
//     }
//     if (stdout) {
//       console.log("stdout occurred: ", err);
//       return;
//     }
//     if (stderr) {
//       console.log("stderr occurred: ", err);
//       return;
//     }
//   });
// })();
