const NakshatraModel = require("./nakshatra.model.js");

class Controller {
  async updateSentiment({ id, payload }) {
    let data = await NakshatraModel.findOneAndUpdate({ _id: id }, payload);
    return data;
  }
  async get({ limit, start, page }) {
    let total = await NakshatraModel.countDocuments();
    let data = await NakshatraModel.find()
      .skip(start)
      .limit(limit)
      .sort({ created_at: -1 });
    return {
      total,
      limit,
      start,
      page,
      data
    };
  }
  async getById(id) {
    return NakshatraModel.findById(id);
  }
}
module.exports = new Controller();
