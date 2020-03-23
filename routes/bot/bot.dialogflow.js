const router = require("express").Router();

const { WebhookClient } = require("dialogflow-fulfillment");
const { dialogflow } = require("actions-on-google");

const welcomeService = require("../../modules/welcome/welcome.bot");

const app = dialogflow();

router.get("/", (req, res, next) => {
  res.json({ message: "Hello from Bot. Please only use POST requests" });
});
router.post("/", async (req, res, next) => {
  const agent = new WebhookClient({ request: req, response: res });
  const welcome = new welcomeService(agent);
  let intentMap = new Map();

  //   console.log("----> " + agent.originalRequest.payload.data.From);

  intentMap.set("Default Welcome Intent", () => {
    return welcome.sendResponse();
  });
  

   intentMap.set("StartStopPrediction", () => {
     return welcome.updatePrediction();
   });

  intentMap.set("DetailedInfoIntent", () => {
    return welcome.saveUser();
  });

  intentMap.set("LocationIntent", () => {
    return welcome.getUserInfo();
  });

  if (agent.intent) {
    agent.handleRequest(intentMap);
  }
});

module.exports = router;
