const User = require("./user.model");

class Controller {
  async saveUser(payload) {
    return User.create(payload);
  }

  async updateConfig(payload) {
    const fs = require("fs");
    fs.writeFileSync(
      __dirname + "/../../config/sankalpam.json",
      JSON.stringify(payload, 2, null)
    );
    return payload;
  }

  async list({ limit, start, page }) {
    let total = await User.countDocuments();
    let data = await User.find()
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
}

module.exports = new Controller();