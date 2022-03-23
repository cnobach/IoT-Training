// Basic Dependencies
const dotenv = require('dotenv').config();
const express = require('express');

//  Route Dependencies
const getAllUsers = require('./src/routes/getAllUsers');

// Setting app (express)
const app = express();

// Setting to use express.json
app.use(express.json());

//  Set up of routes

app.get('/', (req, res) => {
    res.status(200).send('Connected Successfully');
})

app.get('/users', getAllUsers);

// Listening on the .env defined port, and display 
app.listen(dotenv.parsed.PORT, () => {
    console.log(`Listening on port: ${dotenv.parsed.PORT}`)
})