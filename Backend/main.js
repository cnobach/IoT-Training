// Basic Dependencies
const dotenv = require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bp = require('body-parser');
const swaggerUI = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

//  Documents
const basicInfo = require('./docs/basicInfo');

//  User Route Dependencies
const getAllUsers = require('./src/routes/users/getAllUsers');
const getUserByID = require('./src/routes/users/getById');
const createUser = require('./src/routes/users/createUser');
const updateUser = require('./src/routes/users/updateUser');
const deleteUser = require('./src/routes/users/deleteUser');
const login = require('./src/routes/users/login')

// Item Route Dependencies
const getAllItems = require('./src/routes/items/getAllItems');
const getItemById = require('./src/routes/items/getById')
const createItem = require('./src/routes/items/createItem')
const updateItem = require('./src/routes/items/updateItem')
const deleteItem = require('./src/routes/items/deleteItem')

// Cart Route Dependencies
const getUserCart = require('./src/routes/cart/getUserCart');
const removeItem = require('./src/routes/cart/removeItem');
const clearCart = require('./src/routes/cart/clearCart');
const addItem = require('./src/routes/cart/addItem');

// Transaction Route Dependencies
const newTrans = require('./src/routes/transactions/newTrans');

// Inventory Route Dependencies
const getInventory = require('./src/routes/inventory/getInventory');
const setInventory = require('./src/routes/inventory/setInventory');

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

//  Base Routes
app.get('/', (req, res) => {
    res.status(200).send('Connected Successfully');
})

// Authenticate JWT
function authJwt(req, res, next){
    const token = req.cookies.token;
    if(token){
        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if(err){
                res.cookie('token', '');
                return res.status(401).send('Authentication Error');
            }
            next();
        })
    } else {
        res.status(403).send('Unauthorized');
    }
}

//  User Routes
app.get('/users', authJwt, getAllUsers);
app.get('/users/:id', authJwt, getUserByID);
app.post('/users', authJwt, createUser);
app.put('/users', authJwt, updateUser);
app.delete('/users/:id', authJwt, deleteUser);
app.post('/login', login)

//  Item routes
app.get('/items', authJwt, getAllItems)
app.get('/items/:id', authJwt, getItemById)
app.post('/items', authJwt, createItem)
app.put('/items', authJwt, updateItem)
app.delete('/items/:id', authJwt, deleteItem)

// Cart routes
app.get('/cart/:id', authJwt, getUserCart);
app.put('/cart/add', authJwt, addItem);
app.put('/cart/remove', authJwt, removeItem);
app.delete('/cart/:id', authJwt, clearCart);

// Transaction route
app.put('/trans/new', authJwt, newTrans);

// Inventory route
app.get('/inventory/:id', authJwt, getInventory)
app.put('/inventory/:id', authJwt, setInventory)


// Listening on the .env defined port, and display 
app.listen(dotenv.parsed.PORT, () => {
    console.log(`Listening on port: ${dotenv.parsed.PORT}`)
})