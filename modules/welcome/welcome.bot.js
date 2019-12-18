const welcomeController = require("./welcome.controller");
const welcomeUtils = require("./welcome.utils");
const twilio = require("../../services/twilio");
const fs = require("fs");
class Welcome {
  constructor(agent) {
    this.agent = agent;
  }

  async sendResponse() {
    let phone = this.agent.originalRequest.payload.data.From;
    phone = phone.replace("whatsapp:", "");
    let data = await welcomeController.getUser(phone);
    if (data) {
      this.agent.add(`hi ${data.name} Your phone is ${data.phone}`);
    }
    if (!data) {
      this.agent.context.set({
        name: "DefaultWelcomeIntent-followup",
        lifespan: 1
      });
      let message = " Enter 1 for English Enter 2 for Telugu";
      twilio.sendSingleMessage(phone, message);
      this.agent.add(
        "Hi there I am A.I. Pundit powered by OnMyMobile. I will send daily predictions, do custom puja as per astrology predictions and suggest a seva in nearby temple based on your birth chart."
      );
    }
  }
  async setLanguage() {
    if (
      this.agent.contexts[0].parameters.number == 1 ||
      this.agent.contexts[0].parameters.number == 0
    ) {
      let phone = this.agent.originalRequest.payload.data.From;
      phone = phone.replace("whatsapp:", "");
      let message =
        "(1 out of 7) What is your name ? Please provide your full name like Krishna Chaintanya. ";
      twilio.sendSingleMessage(phone, message);
      this.agent.add(
        "We need your Name, Gender, Date & time of birth, Gothra and current location to get started. Lets get your started. Alternatively you can fill this form instead of answering the question one after another."
      );
    } else if (this.agent.contexts[0].parameters.number == 2) {
      this.agent.add("Telugu currently not supported.");
    }
  }
  async saveUser() {
    let phone = this.agent.originalRequest.payload.data.From;
    phone = phone.replace("whatsapp:", "");
    let parameters = this.agent.parameters;

    let pob = parameters.pob;
    pob = await welcomeUtils.getGeoLocation(pob);
    let location = parameters.location.city;
    location = await welcomeUtils.getGeoLocation(location);

    let userDetail = {
      name: parameters.person.name,
      gender: parameters.gender.toLowerCase(),
      phone: phone,
      dob: parameters.dob.date_time,
      pob: {
        place: pob.place_name,
        coordinates: {
          longitude: Number(pob.longitude),
          latitude: Number(pob.latitude)
        }
      },
      gothra: parameters.gothra,
      currentLocation: {
        place: location.place_name,
        coordinates: {
          longitude: Number(location.longitude),
          latitude: Number(location.latitude)
        }
      },
      lang: parameters.Language
    };
    let userdb = await welcomeController.createUsingphone(userDetail);
    let data = await welcomeUtils.getAstroDetails(userdb);
    let message = `As per your inputs your rasi: ${data.sign}, Nakshtra: ${data.Naksahtra}. You will receive daily astrology prediction from us.`;
    twilio.sendSingleMessage(phone, message);
    this.agent.add(
      "Hi there I am A.I.Pundit powered by OnMyMobile. I will send daily astrology predictions, do custom puja as per astrology predictions and suggest a seva in nearby temple based on your birth chart"
    );
  }

  async setUser() {
    let { number, name } = this.agent.parameters;
    if (number === 2 && !name) {
      this.agent.add("Enter your name");
    }
    if (number === 2 && name) {
      this.agent.add(`Your name is ${name}`);
    }
  }

  async setName() {
    let { name } = this.agent.parameters.person;
    // this.agent.context.set({
    //   name: "DefaultWelcomeIntent-selectnumber-custom-followup",
    //   lifespan: 5,
    //   parameters: {
    //     value: this.agent.contexts[0].parameters.person
    //   }
    // });
    this.agent.add(
      `(2 out of 7) You have entered ${name}. You can enter -1 if you want to correct this. What is your Gender. Please enter 1 for Male. 2 for Female. 3 for others`
    );
  }

  async setGender() {
    let { gender } = this.agent.parameters;

    let g;
    if (gender === 1) {
      g = "Male";
    } else if (gender === 2) {
      g = "Female";
    } else if (gender === 3) {
      g = "Others";
    } else {
      this.agent.add("Please enter 1 for Male. 2 for Female. 3 for others");
      return;
    }
    this.agent.add(
      `(3 out of 7) Your Name:${this.agent.context.contexts.generic.parameters.person.name}, Gender:${g}. Please enter -1 to change Gender. Type 0 to start from Beginning. What is your Date of Birth? Please enter in YYYY-MM-DD format. Ex: 1995-01-05.`
    );
  }

  async setDate() {
    let { date } = this.agent.parameters;
    console.log(date);
    if (typeof new Date(date) === "object") {
      date = date.split("T")[0];
      this.agent.add(
        `(4 out of 7):Your Date of Birth is ${date} Please enter -1 to change last input. 0 to start from beginning. What is your time of birth? Please enter in 24 hours format 24HH:MM. ex: 06:30 or 18:01`
      );
    } else {
      this.agent.add("Please enter a valid Date of birth.");
    }
  }
  async setTime() {
    let { time } = this.agent.parameters;
    time = time.split("T")[1];
    time = time.split("+")[0];
    this.agent.add(
      `(5 out of 7) You entered ${time} Please enter -1 to change last input. 0 to start from beginning. What is your place of birth? Enter the city/town name. Include state,region &country for locations out India. Ex: Chirala, London, U.K.`
    );
  }
  async setPlace() {
    let { pob } = this.agent.parameters;

    this.agent.add(
      `(6 out of 7) You entered ${pob} as your birth place.  Please enter -1 to change last input. 0 to start from beginning.  What is your Gothra?`
    );
  }
  async setGothra() {
    let { gothra } = this.agent.parameters;
    this.agent.add(
      `(7 out of 7) You entered ${gothra} as your Gothra.  Please enter -1 to change last input. 0 to start from beginning.  What is your current location?`
    );
  }
  async setCurrentLocation() {
    let { pob, dob } = await welcomeController.saveDetails(
      this.agent.context.contexts.generic.parameters,
      this.agent.originalRequest.payload.data.From.replace("whatsapp:", "")
    );
    //API CALL HERE
    let { sign, Naksahtra } = await welcomeUtils.getAstroDetails({ pob, dob });
    // console.log(data);
    this.agent.add(
      `As per your inputs your rasi: ${sign}, Nakshtra: ${Naksahtra}. You will receive daily astrology prediction from us.`
    );
  }

  async getNakshatra({ pob, dob }) {
    await welcomeUtils.getDailyNakshatraPrediction({ pob, dob });
  }
}

module.exports = Welcome;
