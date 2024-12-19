const express = require('express');
const User = require('../models/User');
const router = express.Router();


router.post('/', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Basic validation (could also be done via Mongoose validation)
        if (!name || !email || !password) {
            return res.status(400).json({ error: true, message: 'Name, email, and password are required' });
        }

        const user = new User({ name, email, password });
        const savedUser = await user.save();
        res.status(201).json({ error: false, message: 'User created', user: savedUser });
    } catch (err) {
        next(err);
    }
});

router.get('/', async (req, res, next) => {
    try {
        let { page = 1, limit = 10 } = req.query;
        page = parseInt(page, 10);
        limit = parseInt(limit, 10);

        const totalUsers = await User.countDocuments({});
        const totalPages = Math.ceil(totalUsers / limit);
        const users = await User.find({})
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        res.json({
            error: false,
            users,
            currentPage: page,
            totalPages
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;
