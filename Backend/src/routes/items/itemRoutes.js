const express = require('express');
router = express.Router();

const getAllItems = require('./getAllItems');
const getItemById = require('./getById')
const createItem = require('./createItem')
const updateItem = require('./updateItem')
const deleteItem = require('./deleteItem')
const authJwt = require('../authJwt');

router.get('/items', authJwt, getAllItems)
router.get('/items/:id', authJwt, getItemById)
router.post('/items', createItem)
router.put('/items', authJwt, updateItem)
router.delete('/items/:id', deleteItem)

module.exports = router;