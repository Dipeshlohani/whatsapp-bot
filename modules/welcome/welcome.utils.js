const axios = require("axios");
const btoa = require("btoa");
const config = require("config");
const { userId, apikey } = config.get("astronomy_api");

class Utils {
  async getGeoLocation(payload) {
    let data = {
      place: payload,
      maxRows: 1
    };
    let response = await axios({
      method: "POST",
      url: "https://json.astrologyapi.com/v1/geo_details",
      headers: {
        authorization: "Basic " + btoa(userId + ":" + apikey),
        "Content-Type": "application/json"
      },
      data: JSON.stringify(data)
    });

    response = response.data.geonames[0];
    return response;
  }
}
module.exports = new Utils();
// let data = {
//   place: "mumbai",
//   maxRows: 4
// };
// function test() {
//   axios({
//     method: "POST",
//     url: "https://json.astrologyapi.com/v1/geo_details",
//     headers: {
//       authorization: "Basic " + btoa(userId + ":" + apikey),
//       "Content-Type": "application/json"
//     },
//     data: JSON.stringify(data)
//   }).then(Response => {
//     console.log(Response.data.geonames);
//   });
// }

// test();
