const axios = require("axios");
const btoa = require("btoa");
const userId = "605706";
const apikey = "1db1024011269f2d80bd8bdd543b7f8c";
let data = {
  place: "mumbai",
  maxRows: 4
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
