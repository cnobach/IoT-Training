// Basic Dependencies
const dotenv = require('dotenv').config();
const express = require('express');
const routes = require('./Routes/routes');

// Setting app (express)
const app = express();

// Setting to use express.json
app.use(express.json());
// Set the router
app.use(routes);

//  Basic route to show connection
app.get('/', (req, res) => {
    res.status(200).send('Connected Successfully');
})

// Listening on the .env defined port, and display 
app.listen(dotenv.parsed.PORT, () => {
    console.log(`Listening on port: ${dotenv.parsed.PORT}`)
})