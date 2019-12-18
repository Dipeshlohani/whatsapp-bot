const axios = require("axios");
const btoa = require("btoa");
const config = require("config");
// const userId = "605706";
// const apikey = "1db1024011269f2d80bd8bdd543b7f8c";
const { userId, apikey } = config.get("astronomy_api");

let data = {
  day: 11,
  month: 12,
  year: 1997,
  hour: 08,
  min: 35,
  lat: 28.05,
  lon: 81.61667,
  tzone: 5.5
};

function test() {
  axios({
    method: "POST",
    url: "https://json.astrologyapi.com/v1/daily_nakshatra_prediction/next",
    headers: {
      authorization: "Basic " + btoa(userId + ":" + apikey),
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data)
  })
    .then(Response => {
      console.log(Response.data);
    })
    .catch(e => {
      console.log(e);
    });
}

test();
