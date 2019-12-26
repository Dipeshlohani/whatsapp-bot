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

exports.getAstroDetails = async ( pob, dob) => {
  let { year, month, day, hour, min } = dob;
  let data = {
    year,
    month,
    day,
    hour,
    min,
    lat: pob.coordinates.latitude,
    lon: pob.coordinates.longitude,
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

exports.getDailyNakshatraPrediction = async ({ pob, dob }) => {
  let { year, month, day, hour, min } = dob;
  let data = {
    day,
    month,
    year,
    hour,
    min,
    lat: pob.coordinates.latitude,
    lon: pob.coordinates.longitude,
    tzone: 5.5
  };
  let response = await axios({
    method: "POST",
    url: "https://json.astrologyapi.com/v1/daily_nakshatra_prediction/next",
    headers: {
      authorization: "Basic " + btoa(userId + ":" + apikey),
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data)
  });
  return response.data;
};
