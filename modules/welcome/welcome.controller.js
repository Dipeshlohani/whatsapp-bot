const UserModel = require("../user/user.model");

class Controller {
  async saveUser(payload) {
    console.log(payload);
  }
  async getUser(payload) {
    let data = await UserModel.findOne({ phone: payload });

    if (data) {
      return data;
    }
    if (!data) {
      return this.createUsingphone(payload);
    }
  }
  async createUsingphone(payload) {
    let data = await UserModel.create({
      phone: payload,
      name: "dipesh",
      gender: "male"
    });
    return data;
  }
}

module.exports = new Controller();
