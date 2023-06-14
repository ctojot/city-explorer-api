'use strict';

console.log('Nice');

// **** REQUIRE **** (import for backend)
const express = require('express');
require('dotenv').config();
const cors = require('cors');

// **** DATA JSON TO USE *****
let data = require('./data/weather.json');

// **** CREATING SERVER - USING EXPRESS ****
// **** app === server ****
const app = express();

// **** MIDDLEWARE ****
app.use(cors());


// **** DEFINE PORT FOR SERVER ****
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Running ${PORT}!`));

// **** ENDPOINTS ****
// *** URL - '/'
// *** Callback function that will handle the incoming rquest, and respond
app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});


// *** CATCH ALL ENDPOINT - NEEDS TO BE LAST ENDPOINT DEFINED ***
app.get('*', (request, response) => {
  response.status(404).send('Sorry, page not found');
});

app.get('/hello', (request, response) => {
  console.log(request.query);
  let userFirstName = request.query.firstname;
  let userLastName = request.query.lastname;

  response.status(200).send(`Hello ${request.query.firstname} ${request.query.lastname}`);
});

app.get('/weather', (request, response, next) => {
  try {
    // TODO: GRAB THE QUERY FROM THE REQUEST.QUERY OBJECT
    // let queriedLat = request.query.lat;
    // let queriedLon = request.query.lon;
    let queriedSearchQuery = request.query.searchQuery;

    // TODO: USE THAT QUERY TO FIND A CITY THAT MATCHES
    let foundCity = data.find(element => (
    //   element.lat === queriedLat &&
    //   element.lon === queriedLon &&
      element.city === queriedSearchQuery
    ));
    // USING CLASS TO GROOM DATA
    let forecastToSend = foundCity.map((element) => new Forecast(element));

    // TODO: SEND THAT FOUND CITY IN THE RESPONSE
    response.status(200).send(forecastToSend);
  } catch (error) {
    next(error);
  }
});


// *** CLASS TO GROOM BULKY DATA ***
class Forecast {
  constructor(cityObj) {
    this.date = cityObj.weather.date;
    this.description = cityObj.weather.description;
  }
}


// *** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ***
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
