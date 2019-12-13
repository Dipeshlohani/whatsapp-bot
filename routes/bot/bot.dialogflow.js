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

  //   console.log(agent.queryResult.parameters.person.name);
  //   console.log("----> " + agent.originalRequest.payload.data.From);
  intentMap.set("Default Welcome Intent", () => {
    return welcome.sendResponse();
  });

  intentMap.set("Default Welcome Intent - select.number - custom", () => {
    return welcome.setName();
  });

  intentMap.set("Default Welcome Intent - select.number - custom - custom", () => {
    return welcome.setGender();
  });
  //   fs.writeFile(__dirname + "/../../play/dialogflow.json", JSON.stringify(req.body, null, 2));
  intentMap.set("InfoIntent", () => {
    return welcome.saveUser();
  });
  intentMap.set("LanguageIntent", () => {
    return welcome.setLanguage();
  });
  intentMap.set("GeneralIntent", () => {
    return welcome.setUser();
  });
  //   intentMap.set("TeluguLanguageIntent",()=>{
  //       return welcome.setLanguage();
  //   })

  if (agent.intent) {
    agent.handleRequest(intentMap);
  }
});

module.exports = router;
