require('dotenv').config();
var cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const db = require('./src/database/connection');

const allRoutes = require('./src/route');
const { ErrorHandler } = require('./src/handler');

const app = express();
const port = process.env.APP_PORT || 4000;
app.use(express.static('public'))

app.use(express.json());

app.use(
    cors({
        origin: '*',
    })
);

app.use('/api', allRoutes);
app.use(ErrorHandler);

db.on('error', (error) => {
    console.log("===== DB ERROR ===== ", error)
})

db.once('connected', () => {
    console.log('Database Connected');
})

app.server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
});