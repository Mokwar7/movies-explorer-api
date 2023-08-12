const express = require('express');

const router = express.Router();

router.use('/users', require('./user'));
router.use('/movies', require('./movie'));

module.exports = router;
