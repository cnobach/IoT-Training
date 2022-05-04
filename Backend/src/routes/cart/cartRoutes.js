const express = require('express');
router = express.Router();

const getUserCart = require('./getUserCart');
const removeItem = require('./removeItem');
const clearCart = require('./clearCart');
const addItem = require('./addItem');
const authJwt = require('../authJwt');

router.get('/cart/:id', authJwt, getUserCart);
router.put('/cart/add', authJwt, addItem);
router.put('/cart/remove', authJwt, removeItem);
router.delete('/cart/:id', authJwt, clearCart);

module.exports = router;