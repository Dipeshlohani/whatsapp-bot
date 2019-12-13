const UserModel = require("../user/user.model");

class Controller {
  async saveUser(payload) {
    console.log(payload);
  }
  async getUser(payload) {
    let data = await UserModel.findOne({ phone: payload });
    if (data) return data;
    return;
  }
  async createUsingphone(payload) {
    let data = await UserModel.create(payload);
    return data;
  }
}

module.exports = new Controller();
