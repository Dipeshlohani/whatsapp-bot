const welcomeController = require("./welcome.controller");

class Welcome {
  constructor(agent) {
    this.agent = agent;
  }

  async sendResponse() {
    let phone = this.agent.originalRequest.payload.data.From;

    phone = phone.replace("whatsapp:", "");
    let data = await welcomeController.getUser(phone);
    console.log(data);
    if (data) {
      this.agent.add(`hi ${data.name} Your phone is ${data.phone}`);
    }
    if (!data) {
      this.agent.add(
        "Hi there I am A.I. Pundit powered by OnMyMobile. I will send daily predictions, do custom puja as per astrology predictions and suggest a seva in nearby temple based on your birth chart."
      );
      //   this.agent.add("Please select a language");
    }
  }
}

module.exports = Welcome;
