const mongoose = require('mongoose');
const { DB } = require('../config');

const { URL } = DB;

mongoose.connect(URL);

module.exports = mongoose.connection;
