const botRouter = require("express").Router();
const dialogflow = require("./bot.dialogflow");

botRouter.use("/dialogflow", dialogflow);

module.exports = botRouter;
