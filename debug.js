require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();


// BUG 1
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


// BUG 2
/*
    The user model below has lack of validations, as those must be added the basic required fields
    besides email must be ensured to be unique as we would never had the same user with the same email address

 */
/*
    OLD CODE
    const User = mongoose.model('User', new mongoose.Schema({
        name: String,
        email: String
    }));
 */
const User  = mongoose.model('User',
    new mongoose.Schema({
        name: { type: String, required: [true, 'Name is required'] },
        email: { type: String, required: [true, 'Email is required'], unique: true }
    })
);


app.use(express.json());

app.post('/users', async (req, res) => {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ message: 'User created', user });
});

app.listen(3000, () => console.log('Server running on port 3000'));