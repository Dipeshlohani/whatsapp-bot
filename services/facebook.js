const axios = require("axios");
class Facebook {
  constructor({ base_url = "https://graph.facebook.com/v5.0", access_token }) {
    this.base_url = base_url;
    this.token = access_token;
  }
  async sendMessage(payload) {
try {
 let message;
    if (payload.attachment) {
      message = {
        attachment: payload.attachment
      };
    }
    if (payload.text) {
      message = {
        text: payload.text
      };
    }

    let response = await axios({
      method: "POST",
      url: `${this.base_url}/me/messages?access_token=${this.token}`,
      headers: { "Content-Type": "application/json" },
      data: {
        messaging_type: "MESSAGE_TAG",
        tag: "CONFIRMED_EVENT_UPDATE",
        recipient: {
          id: payload.id
        },
        message
      }
    });
    console.log(response.data);
    return response.data;
} catch(e) {
	console.log(e);
}
   
  }
}

module.exports = Facebook;
