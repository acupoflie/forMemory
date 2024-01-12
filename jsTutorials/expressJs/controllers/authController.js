

const User = require('../models/userModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError')

exports.signup = asyncErrorHandler( async (req, res, next) => {
    const newUser = await User.create(req.body);

    const token = jwt.sign({id: newUser._id}, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES
    });

    res.status(201).json({
        status: "success",
        token,
        data: {
            user: newUser
        }
    });
});

exports.login = asyncErrorHandler( async (req, res, next) => {
    // const email = req.body.email;
    // const password = req.body.password;

    const {email, password} = req.body;

    if(!email || !password) {
        const error = new CustomError('Please provide email ID & Password for log in', 400);
        return next(error);
    }

    const user = await User.findOne({email}).select('+password');

    res.status(200).json({
        status: "success",
        token: '',
        user
    })
})