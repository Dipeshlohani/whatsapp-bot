const UserModel = require("../user/user.model");
const Utils = require("./welcome.utils");
const { userDetailTTS, combineTTS } = require("../../services/cronHandler");

class Controller {
  async getUser(id) {
    let data = await UserModel.findOne({ fbmsn_id: id });
    if (data) return data;
    return;
  }

  async updateUser(id, payload) {
    return await UserModel.findOneAndUpdate(
      { _id: id },
      {
        birth_moon_sign: payload.sign,
        birth_moon_nakshatra: payload.Naksahtra
      }
    );
  }

  async saveDetails({
    name,
    gender,
    dob,
    pob,
    currentLocation,
    gothra,
    fbmsn_id,
    sign,
    Naksahtra
  }) {
    let obj = {
      name,
      gender,
      dob,
      pob,
      currentLocation,
      gothra,
      fbmsn_id,
      birth_moon_sign: sign,
      birth_moon_nakshatra: Naksahtra
    };
    let userdb = await this.createUsingphone(obj);
    return userdb;
  }
  async createUsingphone(payload) {
    //let data = await UserModel.create(payload);
    let data = await UserModel.findOneAndUpdate({ fbmsn_id: payload.fbmsn_id }, payload, {
      new: true,
      upsert: true
    });
    await userDetailTTS(data);
    await combineTTS(data);
    return data;
  }
}

module.exports = new Controller();
