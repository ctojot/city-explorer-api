'use strict';

console.log('Nice');

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
const weatherModularize = require('./modules/weather.js');
const moviesModularize = require('./modules/movies.js');

app.use(cors());
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => console.log(`Running ${PORT}!`));

app.get('/', (request, response) => {
  response.status(200).send('Welcome to my server!');
});



app.get('/weather', weatherModularize);
app.get('/movies', moviesModularize);

app.get('*', (request, response) => {
  response.status(404).send('Sorry, page not found');
});

// *** ERROR HANDLING - PLUG AND PLAY CODE FROM EXPRESS DOCS ***
app.use((error, request, response, next) => {
  console.log(error.message);
  response.status(500).send(error.message);
});
