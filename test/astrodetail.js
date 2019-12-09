const axios = require("axios");
const btoa = require("btoa");
const userId = "605706";
const apikey = "1db1024011269f2d80bd8bdd543b7f8c";
let data = {
  day: 11,
  month: 12,
  year: 1997,
  hour: 08,
  min: 35,
  lat: 28.0531092,
  lon: 81.618695,
  tzone: 5.5
};
function test() {
  axios({
    method: "POST",
    url: "	https://json.astrologyapi.com/v1/astro_details",
    headers: {
      authorization: "Basic " + btoa(userId + ":" + apikey),
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data)
  }).then(Response => {
    console.log(Response.data);
  });
}

test();
