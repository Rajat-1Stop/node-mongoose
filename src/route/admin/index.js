const express = require('express');
const router = express.Router();
const { role } = require('../../middleware');
const usersRoute = require('./user');

router.use('/user', role('admin'), usersRoute);

module.exports = router;
