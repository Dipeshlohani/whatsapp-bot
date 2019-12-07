const axios = require("axios");
const config = require("config");
// const { Text, Card, Image, Suggestion, Payload } = require("dialogflow-fulfillment");

// // const { Bot } = require("../base");
// const User = require("../user/user.controller");
// const ReferralHandler = require("./referral.handler");
// const { ERR, DialogFlow } = require("../../utils/");
// const FBMsn = require("../../services/facebook");

// const access_token = config.get("services.fbpage.access_token");
// const FB = new FBMsn({ access_token });

class Welcome {
//     async sendResponse() {
//         let payload;
//         let refPostback = this.agent.originalRequest.payload.data.postback;
//         let user = await this.saveUsertoDB();
//         let ref = new ReferralHandler({ fname: user.info.fname, platform: this.agent.FACEBOOK });
//         if (!refPostback || !refPostback["referral"]) {
//             payload = ref.handle();
//         } else if (refPostback["referral"]) {
//             payload = ref.handle(refPostback.referral.ref);
//         }
//         this.agent.add(payload);
//     }

//     async saveUsertoDB() {
//         let info = await this.getUserInfoFromFacebook();
//         let user = await User.checkAndCreateUser(info);
//         return { user_id: user._id, info };
//     }

//     async getUserInfoFromFacebook() {
//         const PSID = this.agent.context.inputContexts.generic.parameters.facebook_sender_id;

//         try {
//             let data = await FB.getUserInfo(PSID);

//             return {
//                 externalId: PSID,
//                 fname: data.first_name,
//                 name: data.name || "User " + PSID,
//                 gender: data.gender || null,
//                 profile_pic: data.profile_pic,
//                 platform: "messenger"
//             };
//         } catch (e) {
//             console.log(e.response.data);
//             return {
//                 externalId: PSID,
//                 fname: "User",
//                 name: "User " + PSID,
//                 gender: null,
//                 profile_pic: null,
//                 platform: "messenger"
//             };
//         }
//     }
}

module.exports = Welcome;
