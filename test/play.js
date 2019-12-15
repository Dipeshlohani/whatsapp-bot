const axios = require("axios");
const btoa = require("btoa");
const config = require("config");
// const userId = "605706";
// const apikey = "1db1024011269f2d80bd8bdd543b7f8c";
const { userId, apikey } = config.get("astronomy_api");

let data = {
  place: "nepalgunj",
  maxRows: 1
};
function test() {
  axios({
    method: "POST",
    url: "https://json.astrologyapi.com/v1/geo_details",
    headers: {
      authorization: "Basic " + btoa(userId + ":" + apikey),
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data)
  }).then(Response => {
    console.log(Response.data.geonames);
  });
}

test();
