const User = require("./user.model");
const Utils = require("../welcome/welcome.utils");
const { userDetailTTS, combineTTS } = require("../../services/cronHandler");
const facebook = require("../../services/facebook");
const config = require("config");
const access_token = config.get("fbpage_token.access_token");
const FB = new facebook({ access_token });

class Controller {
  async saveUser(payload) {
    let currentLocation = await Utils.getGeoLocation(payload.currentLocation.place);
    let pob = await Utils.getGeoLocation(payload.pob.place);
    pob = {
      place: payload.pob.place,
      coordinates: {
        longitude: pob.longitude,
        latitude: pob.latitude
      }
    };
    currentLocation = {
      place: payload.currentLocation.place,
      coordinates: {
        longitude: currentLocation.longitude,
        latitude: currentLocation.latitude
      }
    };
    let { sign, Naksahtra } = await Utils.getAstroDetails(pob, payload.dob);
    payload.pob = pob;
    payload.currentLocation = currentLocation;
    payload.birth_moon_sign = sign;
    payload.birth_moon_nakshatra = Naksahtra;
    let data = await User.create(payload);
    let PSID = data.fbmsn_id;

 
    let message = `As per your inputs your rasi: ${sign}, Nakshtra: ${Naksahtra}. You will receive daily astrology prediction from us.`;
    payload = {
      id: PSID,
      text: message
    };
    await FB.sendMessage(payload);
    await userDetailTTS(data);
    await combineTTS(data);
    return data;
  }

  async list({ limit, start, page }) {
    let total = await User.countDocuments();
    let data = await User.find()
      .skip(start)
      .limit(limit)
      .sort({ created_at: -1 });
    return {
      total,
      limit,
      start,
      page,
      data
    };
  }
  async updateConfig(payload) {
    const fs = require("fs");
    fs.writeFileSync(__dirname + "/../../config/sankalpam.json", JSON.stringify(payload, 2, null));
    return payload;
  }
}

module.exports = new Controller();
