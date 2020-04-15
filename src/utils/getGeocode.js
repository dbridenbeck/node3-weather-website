const axios = require('axios');

const getGeocode = (address) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiZGJyaWRlbmJlY2siLCJhIjoiY2s5MWh2a29zMDA4cDNlc3p6NXRtNnQ2ZiJ9.lX0VfIeYLTNcyh-u66I8gQ&limit=1`;
  return axios
    .get(url)
    .then( ({ data: {features} } = {}) => {
      const center = features[0].center;
      return {
        location: center[1] + "," + center[0],
        name: features[0].place_name,
      };
    })
    .catch((error) => {
      if (error.code) {
        throw `Unable to connect to location service. Error was: ${error.code}`;
      } else {
        throw `Unable to find location with: ${address} \nPlease try another search.`;
      }
    });
};

module.exports = getGeocode;