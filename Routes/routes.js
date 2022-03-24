const express = require('express');
const router = express.Router();
const f = require('../Controller/controller');

router.route('/users')
    .get(f.getAllUsers);

module.exports = router;