const UserModel = require("./user.model");

class Controller {
  async save(payload) {
    let data = await UserModel.create(payload);
    return data;
  }
  async get({ limit, start, page }) {
    let total = await UserModel.countDocuments();
    let data = await UserModel.find()
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
  async updateConfig(payload) {
    const fs = require("fs");
    fs.writeFileSync(__dirname + "/../../config/sankalpam.json", JSON.stringify(payload, 2, null));
    return payload;
  }
}

module.exports = new Controller();
