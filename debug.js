require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const app = express();


// BUG #1
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


// BUG #2
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

// BUG #3
/*
    The user route only shows the 201 status code in the response when the user is created,
    Meanwhile in violation of the validation there must be response code of 400
    and also to make sure in case of any other unhandled error hence we must use try catch

    OLD CODE
    app.post('/users', async (req, res) => {
        const user = new User(req.body);
        await user.save();
        res.status(201).send({ message: 'User created', user });
    });

 */
app.post('/users', async (req, res) => {
    try{
        const [name, email] = [req.body.name, req.body.email];
        if(!name || !email){
            return res.status(400).send({ error: true, message: 'Name and email are required' });
        }

        const user = new User({ name, email });
        await user.save();
        res.status(201).send({ message: 'User created', user });
    }catch (err) {
        next(err);
    }
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
    let statusCode = 500;
    let message = 'Internal Server Error';

    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = Object.values(err.errors).map(val => val.message).join(', ');
    }

    if (err.code && err.code === 11000) {
        statusCode = 400;
        message = 'Duplicate email value entered';
    }

    res.status(statusCode).json({ error: true, message });
});


app.listen(3000, () => console.log('Server running on port 3000'));