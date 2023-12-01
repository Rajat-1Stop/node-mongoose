const express = require('express');
const authRoutes = require('./auth');
const adminRoutes = require('./admin');

const { auth } = require('../middleware');

const router = express.Router();

router.use('/', authRoutes);
router.use('/admin', auth, adminRoutes);

module.exports = router;