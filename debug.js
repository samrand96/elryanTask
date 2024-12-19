require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();

mongoose.connect(process.env.MONGO_URI || '');

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