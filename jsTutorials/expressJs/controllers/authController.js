

const User = require('../models/userModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');

exports.signup = asyncErrorHandler( async (req, res, next) => {
    const newUser = await User.create(req.body);

    res.status(201).json({
        status: "success",
        data: {
            user: newUser
        }
    });
});