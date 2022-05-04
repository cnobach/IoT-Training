const express = require('express');
router = express.Router();

const newTrans = require('./newTrans');
const authJwt = require('../authJwt');

router.put('/trans/new', authJwt, newTrans);

module.exports = router;