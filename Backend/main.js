// Basic Dependencies
const dotenv = require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bp = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const cookieParser = require('cookie-parser');

//  Documents
const basicInfo = require('./docs/basicInfo');

//  User Route Dependencies
const users = require('./src/routes/users/usersRoutes');

// Item Route Dependencies
const items = require('./src/routes/items/itemRoutes');

// Cart Route Dependencies
const cart = require('./src/routes/cart/cartRoutes');

// Transaction Route Dependencies
const transactions = require('./src/routes/transactions/transRoutes');

// Inventory Route Dependencies
const inventory = require('./src/routes/inventory/inventoryRoutes');

// Setting app (express)
const app = express();

var corsOptions = {
    origin: `http://localhost:4200`,
    credentials: true
}


app.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

// Setting to use express.json
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"));
app.use(bp.json());
app.use(cors(corsOptions));
app.use(cookieParser());

//  Swagger routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(basicInfo));

//  User Routes
app.use(users);

//  Item routes
app.use(items);

// Cart routes
app.use(cart);

// Transaction route
app.use(transactions);

// Inventory route
app.use(inventory);


// Listening on the .env defined port, and display 
app.listen(dotenv.parsed.PORT, () => {
    console.log(`Listening on port: ${dotenv.parsed.PORT}`)
})