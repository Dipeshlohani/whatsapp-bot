const axios = require("axios");
const config = require("config");
const { accountSid, authToken } = config.get("twilio_api");
const client = require("twilio")(accountSid, authToken);
class twilioNotify {
  async sendSingleMessage(phone, message) {
    await client.messages
      .create({
        body: message,
        from: "whatsapp:+14155238886",
        to: `whatsapp:${phone}`
      })
      .then(message => console.log(message.sid))
      .catch(e => {
        console.log(e);
      });
    return;
  }
}

module.exports = new twilioNotify();
