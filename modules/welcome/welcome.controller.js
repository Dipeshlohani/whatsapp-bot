const UserModel = require("../user/user.model");
const Utils = require("./welcome.utils");

class Controller {

  async getUser(payload) {
    let data = await UserModel.findOne({ phone: payload });
    if (data) return data;
    return;
  }

  async saveDetails(payload, phone) {
    let gender, year, month, day, hour, min, dob;
    gender = payload["gender.original"];
    if (gender == "1") gender = "Male";
    if (gender == "2") gender = "Female";
    if (gender == "3") gender = "Others";

    let date = payload.date.split("T")[0].split("-");
    let time = payload["time.original"].split(":");
    dob = {
      year: date[0],
      month: date[1],
      day: date[2],
      hour: time[0],
      min: time[1]
    };
    let pob = await Utils.getGeoLocation(payload["pob.original"]);
    pob = {
      place: payload["pob.original"],
      coordinates: {
        longitude: pob.longitude,
        latitude: pob.latitude
      }
    };
    let currentLocation = await Utils.getGeoLocation(payload["currentlocation.original"]);
    currentLocation = {
      place: payload["currentlocation.original"],
      coordinates: {
        longitude: currentLocation.longitude,
        latitude: currentLocation.latitude
      }
    };

    let obj = {
      name: payload["person.original"],
      gender,
      phone,
      dob,
      pob,
      gothra: payload["gothra.original"],
      currentLocation
    };
    let userdb = await this.createUsingphone(obj);
    return userdb;
  }
  async createUsingphone(payload) {
    let data = await UserModel.create(payload);
    return data;
  }
}

module.exports = new Controller();
