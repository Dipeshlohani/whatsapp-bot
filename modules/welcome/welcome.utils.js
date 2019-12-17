const axios = require("axios");
const btoa = require("btoa");
const config = require("config");
const { userId, apikey } = config.get("astronomy_api");
// class Utils {
exports.getGeoLocation = async payload => {
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
};

exports.getAstroDetails = async payload => {
  // console.log(typeof payload.dob, payload.dob, "---");
  let date = new Date(payload.dob);

  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDay();
  let hour = date.getHours();
  let min = date.getMinutes();

  console.log(payload);

  let data = {
    day,
    month,
    year,
    hour,
    min,
    lat: payload.pob.coordinates.latitude,
    lon: payload.pob.coordinates.longitude,
    tzone: 5.5
  };
  let response = await axios({
    method: "POST",
    url: "https://json.astrologyapi.com/v1/astro_details",
    headers: {
      authorization: "Basic " + btoa(userId + ":" + apikey),
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data)
  });
  return response.data;
};
// }
// module.exports = new Utils();
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
