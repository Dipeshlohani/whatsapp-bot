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
    // let data = await welcomeController.getUser(phone);
    // if (data) {
    //   this.agent.add(`hi ${data.name} Your phone is ${data.phone}`);
    // }
    this.agent.add(
      "Hi there I am A.I. Pundit powered by OnMyMobile. I will send daily predictions, do custom puja as per astrology predictions and suggest a seva in nearby temple based on your birth chart. Enter 1 for English, 2 for Telugu."
    );
  }

  async saveUser() {
    //Don't delete this
    // let phone = this.agent.originalRequest.payload.data.From;
    // phone = phone.replace("whatsapp:", "");
    let { person, gender, date, time, pob, gothra, current_location } = this.agent.parameters;
    let { name } = person;
    let p_o_b = pob;
    date = date.split("T")[0];
    time = time.split("T")[1];
    time = time.split("+")[0];
    let detail = await welcomeController.saveDetails(
      { name, gender, time, p_o_b, current_location, date, gothra },
      "+9779843598848"
    );
    let { sign, Naksahtra } = await welcomeUtils.getAstroDetails(detail.pob, detail.dob);
    this.agent.add(
      `As per your inputs your rasi: ${sign}, Nakshtra: ${Naksahtra}. You will receive daily astrology prediction from us.`
    );
  }

  async getUserInfo() {
    let {
      "person.original": name,
      gender,
      "time.original": time,
      "pob.original": p_o_b,
      "current_location.original": current_location,
      date,
      "gothra.original": gothra
    } = this.agent.context.contexts.random.parameters;
    let { pob, dob } = await welcomeController.saveDetails(
      { name, gender, time, p_o_b, current_location, date, gothra },
      "+977 9843598848"
    );
    //API CALL HERE
    //DONOT DELETE  this.agent.originalRequest.payload.data.From.replace("whatsapp:", "")

    let { sign, Naksahtra } = await welcomeUtils.getAstroDetails(pob, dob);
    this.agent.add(
      `As per your inputs your rasi: ${sign}, Nakshtra: ${Naksahtra}. You will receive daily astrology prediction from us.`
    );
  }

  async getNakshatra({ pob, dob }) {
    await welcomeUtils.getDailyNakshatraPrediction({ pob, dob });
  }
}

module.exports = Welcome;
