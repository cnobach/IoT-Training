// Basic Dependencies
const dotenv = require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const swaggerUI = require('swagger-ui-express');

//  Documents
const basicInfo = require('./docs/basicInfo');

//  User Route Dependencies
const getAllUsers = require('./src/routes/users/getAllUsers');
const getUserByID = require('./src/routes/users/getById');
const createUser = require('./src/routes/users/createUser');
const updateUser = require('./src/routes/users/updateUser');
const deleteUser = require('./src/routes/users/deleteUser');

// Item Route Dependencies
const getAllItems = require('./src/routes/items/getAllItems');
const getItemById = require('./src/routes/items/getById')
const createItem = require('./src/routes/items/createItem')
const updateItem = require('./src/routes/items/updateItem')
const deleteItem = require('./src/routes/items/deleteItem')

// Setting app (express)
const app = express();

// Setting to use express.json
app.use(express.json());
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"));
app.use(cors());

//  Swagger routes
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(basicInfo));

//  Base Routes
app.get('/', (req, res) => {
    res.status(200).send('Connected Successfully');
})

//  User Routes
app.get('/users', getAllUsers);
app.get('/users/:id', getUserByID);
app.post('/users', createUser);
app.put('/users', updateUser);
app.delete('/users/:id', deleteUser);

//  Item routes
app.get('/items', getAllItems)
app.get('/items/:id', getItemById)
app.post('/items', createItem)
app.put('/items', updateItem)
app.delete('/items/:id', deleteItem)

// Listening on the .env defined port, and display 
app.listen(dotenv.parsed.PORT, () => {
    console.log(`Listening on port: ${dotenv.parsed.PORT}`)
})