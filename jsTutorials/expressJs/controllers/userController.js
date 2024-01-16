
const User = require('../models/userModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');
const util = require('util');
const sendEmail = require('../utils/email');
const crypto = require('crypto');
const authController = require('./authController');

const filterReqObj = (obj, ...allowedFields) => {
    const newObj = {};
    Object.keys(obj).forEach((prop) => {
        if(allowedFields.includes(prop)) newObj[prop] = obj[prop]
    });
    return newObj;
}

exports.updatePassword = asyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user._id).select('+password');

    if(!(await user.comparePasswordInDb(req.body.currentPassword, user.password))) {
        next(new CustomError('Current password you provided is wrong!', 401));
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    await user.save();

    authController.createSendResponse(user, 200, res);
});

exports.updateMe = asyncErrorHandler(async (req, res, next) => {
    if(req.body.password || req.body.confirmPassword) {
        return next(new CustomError('You cannot update your password using this endpoint', 400));
    }

    const filterObj = filterReqObj(req.body, 'name', 'email');
    const updatedUser = await User.findByIdAndUpdate(req.user._id, filterObj, {runValidators: true, new: true});

    // we cant use save method without filtering the request params
    // await user.save();

    authController.createSendResponse(updatedUser, 200, res);
});