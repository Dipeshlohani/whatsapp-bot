const mongoose = require("mongoose");
const config = require("config");
mongoose.connect(config.get("db.url"), {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});
const UserModal = require("../modules/user/user.model");
const APIUtils = require("../modules/welcome/welcome.utils");
const AstroModel = require("../modules/astrology/astrology.model")

const setUsersNakshatra = async() => {
    let users = await UserModal.aggregate([
      {
        $project: {
          _id: 1,
            dob: 1,
            pob: 1
        }
      }
    ]);
    for(let user of users) {
        let { _id, pob, dob }= user;
        let data = await APIUtils.getDailyNakshatraPrediction({pob,dob});
        data.user = _id;
        await AstroModel.create(data);
    }
    process.exit();
}

const sendNakshatraNotification = async () => {

};

setUsersNakshatra();