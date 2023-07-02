'use strict';
const axios = require('axios');

async function weatherModularize (request, response, next){
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let weatherURL = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.REACT_WEATHER_API}&lat=${lat}&lon=${lon}`;
    let weatherDataFromAxios = await axios.get(weatherURL);
    if (weatherDataFromAxios){
      let forecastWeather = weatherDataFromAxios.data.data.map(element => {
        return new Forecast(element);
      });
      response.status(200).send(forecastWeather);
    } else {
      response.status(500).send('RESULTS NOT FOUND');
    }
  } catch (error) {
    next(error);
  }
}

class Forecast {
  constructor(cityObj) {
    this.date = cityObj.valid_date;
    this.description = cityObj.weather.description;
  }
}


module.exports = weatherModularize;
