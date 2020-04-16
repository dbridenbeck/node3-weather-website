const axios = require('axios');

const getWeather = ({ location, name }) => {
  const url = `http://api.weatherstack.com/current?access_key=364359002d61754e4d63685d7107f332&query=${location}&units=f`;
  return axios
    .get(url)
    .then(( {data: {current} } = {} ) => {
      return {
        forecast: `${current.weather_descriptions}. Currently ${current.temperature} degrees with a ${current.precip} chance of rain.`,
        location: name,
      }
    })
    .catch((error) => {
      if (error.code) {
        throw `Unable to connect to weather service! Error was:" ${error.code}`;
      } else {
        throw "Unable to find location in your search:", url;
      }
    });
};

module.exports = getWeather;