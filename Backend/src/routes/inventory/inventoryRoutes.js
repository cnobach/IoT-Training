const express = require('express');
router = express.Router();

const getInventory = require('./getInventory');
const setInventory = require('./setInventory');
const authJwt = require('../authJwt');

router.get('/inventory/:id', authJwt, getInventory)
router.put('/inventory/:id', authJwt, setInventory)

module.exports = router;