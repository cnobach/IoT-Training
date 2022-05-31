const express = require('express');
router = express.Router();

const getAllUsers = require('./getAllUsers');
const getUserByID = require('./getById');
const createUser = require('./createUser');
const updateUser = require('./updateUser');
const deleteUser = require('./deleteUser');
const login = require('./login')
const authJwt = require('../authJwt');

router.get('/users', authJwt, getAllUsers);
router.get('/users/:id', authJwt, getUserByID);
router.post('/users', createUser);
router.put('/users', authJwt, updateUser);
router.delete('/users/:id', authJwt, deleteUser);
router.post('/login', login)

module.exports = router;