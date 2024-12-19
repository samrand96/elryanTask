require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./src/routes/users');
const notFound = require('./src/middleware/notFound');
const errorHandler = require('./src/middleware/errorHandler');

const MONGO_URI = process.env.MONGO_URI || '';

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

const app = express();

app.use(express.json());

app.use('/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;