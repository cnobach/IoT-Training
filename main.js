/**
 * To run with nodemon, call npm start
 * Must have a .env file created to run - .env not shared
 */

// Basic Dependencies
const dotenv = require('dotenv').config();
const express = require('express');

// Setting app (express)
const app = express();

// Setting to use express.json
app.use(express.json());

// Listening on the .env defined port, and display 
app.listen(dotenv.parsed.PORT, () => {
    console.log(`Listening on port: ${dotenv.parsed.PORT}`)
})