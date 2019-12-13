const welcomeController = require("./welcome.controller");
const welcomeUtils = require("./welcome.utils");
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
      this.agent.add(
        "Hi there I am A.I. Pundit powered by OnMyMobile. I will send daily predictions, do custom puja as per astrology predictions and suggest a seva in nearby temple based on your birth chart. \n Enter 1 for English Enter 2 for Telugu"
      );
    }
  }
  async setLanguage() {
    console.log(this.agent.contexts[0].parameters.number);
    if (this.agent.contexts[0].parameters.number == 1) {
      this.agent.context.set({
        name: "getUser",
        lifespan: 1,
        parameters: {
          value: this.agent.contexts[0].parameters.number
        }
      });
      this.agent.add(
        "We need your Name, Gender, Date & time of birth, Gothra and current location to get started. Lets get your started. Alternatively you can fill this form instead of answering the question one after another. Select 1 for Form or 2 to fill manually"
      );
    } else if (this.agent.contexts[0].parameters.number == 2) {
      this.agent.add("Telugu currently not supported.");
    } else {
      this.agent.add("Sorry! I cannot get that language please enter again.");
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
    await welcomeController.createUsingphone(userDetail);
    this.agent.add(
      "Hi there I am A.I.Pundit powered by OnMyMobile. I will send daily astrology predictions, do custom puja as per astrology predictions and suggest a seva in nearby temple based on your birth chart"
    );
  }

  async setUser() {
    console.log(this.agent.parameters);
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
    fs.writeFile(
      __dirname + "/../../play/dialogflow.json",
      JSON.stringify(this.agent.context, null, 2)
    );
    let { gender } = this.agent.parameters;
    let g;
    if (gender === 1) {
      g = "Male";
    } else if (gender === 2) {
      g = "Female";
    } else if (gender === 3) {
      g = "Others";
    }
    console.log(this.agent.parameters);
    this.agent.add(
      `(3 out of 7) Your Name:${this.agent.context.contexts.generic.parameters.person.name}, Gender:${g}. Please enter -1 to change Gender. Type 0 to start from Beginning. What is your Date of Birth? Please enter in DD MM YYYY format. Ex: 04 03 1985.`
    );
  }
}

module.exports = Welcome;
