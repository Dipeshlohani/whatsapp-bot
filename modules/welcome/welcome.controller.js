const UserModel = require("../user/user.model");
const Utils = require("./welcome.utils");

class Controller {

  async getUser(payload) {
    let data = await UserModel.findOne({ phone: payload });
    if (data) return data;
    return;
  }

  async saveDetails(payload, phone) {
    let dob;

    let date = payload.date.split("T")[0].split("-");
    let time = payload.time.split(":");
    dob = {
      year: date[0],
      month: date[1],
      day: date[2],
      hour: time[0],
      min: time[1]
    };
    let pob = await Utils.getGeoLocation(payload.p_o_b);
    pob = {
      place: payload.p_o_b,
      coordinates: {
        longitude: pob.longitude,
        latitude: pob.latitude
      }
    };
    let currentLocation = await Utils.getGeoLocation(payload.current_location);
    currentLocation = {
      place: payload.current_location,
      coordinates: {
        longitude: currentLocation.longitude,
        latitude: currentLocation.latitude
      }
    };

    let obj = {
      name: payload.name,
      gender: payload.gender,
      phone,
      dob,
      pob,
      gothra: payload.gothra,
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
