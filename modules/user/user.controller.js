const UserModel = require("./user.model");

class Controller {
  async save(payload) {
    let data = await UserModel.create(payload);
    return data;
  }
}
module.exports = new Controller();