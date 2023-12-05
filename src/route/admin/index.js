const express = require('express');
const router = express.Router();
const { role } = require('../../middleware');
const usersRoute = require('./user');
const productsRoute = require('./product');

router.use('/user', role('admin'), usersRoute);
router.use('/product', role('admin'), productsRoute);

module.exports = router;
