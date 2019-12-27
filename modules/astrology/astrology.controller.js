const NakshatraModel = require("./nakshatra.model.js");

class Controller {
  async updateSentiment({ id, payload }) {
    let data = await NakshatraModel.findOneAndUpdate({ _id: id }, payload);
    return data;
  }
}
module.exports = new Controller();
