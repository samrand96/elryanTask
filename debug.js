require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

/* This db initialization has a problem in a case of not connecting to the database
    there will be an instant crash hence we need to handle it using then and catch that are necessary
    to handle the error using catch and also handle the success using then
 */

/*
    OLD CODE
    mongoose.connect(process.env.MONGO_URI || '')
 */
mongoose.connect(process.env.MONGO_URI || '' )
    .then(
        () => console.log('MongoDB Connected'),
    )
    .catch(
        err => console.error('MongoDB connection error:', err)
    )


const User = mongoose.model('User', new mongoose.Schema({
    name: String,
    email: String
}));

app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: 'User created', user });
});

app.listen(3000, () => console.log('Server running on port 3000'));