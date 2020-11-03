'use strict';
require('dotenv').config();
const express = require('express')
// const cors = require('cors')
//const { CLIENT_ORIGIN } = require('../config');
const { NODE_ENV } = require('../config');
const app = express()

app.use(helmet());

// whitelist allowed origins
// const allowedOrigins = ['http://localhost:3000', 'https://dsa-petful-client.jackie-abert.vercel.app'];
// app.use(cors({
//   origin: function(origin, callback){
//     // allow requests with no origin - like mobile apps, curl, postman
//     if(!origin) return callback(null, true);
//     if(allowedOrigins.indexOf(origin) === -1){
//       const msg = 'The CORS policy for this site does not ' +
//                   'allow access from the specified Origin.';
//       return callback(new Error(msg), false);
//     }
//     return callback(null, true);
//   }
// }));

// app.use(cors({
//     origin: CLIENT_ORIGIN
// }));

app.use('/people', require('../people/people.router'))
app.use('/pets', require('../pets/pets.router'))

app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === 'production') {
      response = { error: { message: 'server error' } };
    } else {
      console.error(error);
      response = { message: error.message, error };
    }
    res.status(500).json(response);
  });


module.exports = app;
