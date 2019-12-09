const router = require("express").Router();

const { WebhookClient } = require("dialogflow-fulfillment");
const { dialogflow } = require("actions-on-google");
const fs = require("fs");

const welcomeService = require("../../modules/welcome/welcome.bot");

const app = dialogflow();

router.get("/", (req, res, next) => {
  res.json({ message: "Hello from Bot. Please only use POST requests" });
});
router.post("/", async (req, res, next) => {
  const agent = new WebhookClient({ request: req, response: res });
  const welcome = new welcomeService(agent);
  let intentMap = new Map();

  console.log("----> " + agent.originalRequest.payload.data.From);

  intentMap.set("Default Welcome Intent", () => {
    return welcome.sendResponse();
  });
  //   fs.writeFile(__dirname + "/../../play/dialogflow.json", JSON.stringify(req.body, null, 2));
  intentMap.set("InfoIntent", () => {
    return welcome.sendResponse();
  });

  if (agent.intent) {
    agent.handleRequest(intentMap);
  }
});

module.exports = router;
