const welcomeController = require("./welcome.controller");
const welcomeUtils = require("./welcome.utils");
const twilio = require("../../services/twilio");
class Welcome {
  constructor(agent) {
    this.agent = agent;
  }

  async sendResponse() {
    // let phone = this.agent.originalRequest.payload.data.From;
    // phone = phone.replace("whatsapp:", "");

    let data = await welcomeController.getUser(this.agent.originalRequest.payload.data.sender.id);
    if (data) {
      this.agent.add(`Hi ${data.name}. You've already registered.Please enter 1 to do it again.`);
    } else {
      this.agent.add(
        "Hi there I am A.I. Pundit powered by OnMyMobile. I will send daily predictions, do custom puja as per astrology predictions and suggest a seva in nearby temple based on your birth chart."
      );
      this.agent.add(" Enter 1 for English, 2 for Telugu");
    }
  }

  async saveUser() {
    //Don't delete this
    // let phone = this.agent.originalRequest.payload.data.From;
    // phone = phone.replace("whatsapp:", "");
    console.log(this.agent.parameters);
    const fbmsn_id = this.agent.originalRequest.payload.data.sender.id;
    let { person, gender, date, time, pob, gothra, current_location } = this.agent.parameters;
    let { name } = person;
    date = date.split("T")[0];
    time = time.split("T")[1];
    time = time.split("+")[0];
    let detail = await welcomeController.saveDetails({
      name,
      gender,
      time,
      pob,
      current_location,
      date,
      gothra,
      fbmsn_id
    });
    let { sign, Naksahtra } = await welcomeUtils.getAstroDetails(detail.pob, detail.dob);
    this.agent.add(
      `As per your inputs your rasi: ${sign}, Nakshtra: ${Naksahtra}. You will receive daily astrology prediction from us.`
    );
  }

  async getUserInfo() {
    const fbmsn_id = this.agent.originalRequest.payload.data.sender.id;
    let {
      "person.original": name,
      gender,
      "time.original": time,
      "pob.original": p_o_b,
      "current_location.original": current_location,
      date,
      "gothra.original": gothra
    } = this.agent.context.contexts.random.parameters;

    date = date.split("T")[0].split("-");
    time = time.split(":");
    let dob = {
      year: date[0],
      month: date[1],
      day: date[2],
      hour: time[0],
      min: time[1]
    };

    let pob = await welcomeUtils.getGeoLocation(p_o_b);
    pob = {
      place: p_o_b,
      coordinates: {
        longitude: pob.longitude,
        latitude: pob.latitude
      }
    };
    let currentLocation = await welcomeUtils.getGeoLocation(current_location);
    currentLocation = {
      place: current_location,
      coordinates: {
        longitude: currentLocation.longitude,
        latitude: currentLocation.latitude
      }
    };

    //DONOT DELETE  this.agent.originalRequest.payload.data.From.replace("whatsapp:", "")
    let { sign, Naksahtra } = await welcomeUtils.getAstroDetails(pob, dob);
    this.agent.add(
      `As per your inputs your rasi: ${sign}, Nakshtra: ${Naksahtra}. You will receive daily astrology prediction from us.`
    );
    await welcomeController.saveDetails({
      name,
      gender,
      dob,
      pob,
      currentLocation,
      gothra,
      fbmsn_id,
      sign,
      Naksahtra
    });
  }

  // async getNakshatra({ pob, dob }) {
  //   await welcomeUtils.getDailyNakshatraPrediction({ pob, dob });
  // }
}

module.exports = Welcome;
