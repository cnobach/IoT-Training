const app = require('./app.js');
const dotenv = require('dotenv').config();

// Listening on the .env defined port, and display 
app.listen(dotenv.parsed.PORT, () => {
    console.log(`Listening on port: ${dotenv.parsed.PORT}`)
})