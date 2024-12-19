const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Name is required'] },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'Email is invalid']
    },
    password: { type: String, required: [true, 'Password is required'] },
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;