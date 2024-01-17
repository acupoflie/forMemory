

const User = require('../models/userModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');
const util = require('util');
const sendEmail = require('../utils/email');
const crypto = require('crypto');

const signToken = id => {
    return jwt.sign({ id }, process.env.SECRET_STR, {
        expiresIn: process.env.LOGIN_EXPIRES
    });
}

const createSendResponse = (user, statusCode, res) => {
    const token = signToken(user._id);

    const options = {
        expiresIn: process.env.LOGIN_EXPIRES,
        httpOnly: true
    }

    if(process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res.cookie('jwt', token, options);

    user.password = undefined;

    res.status(statusCode).json({
        status: "success",
        token,
        data: {
            user
        }
    });
}

exports.signup = asyncErrorHandler(async (req, res, next) => {
    const newUser = await User.create(req.body);

    createSendResponse(newUser, 201, res);
});

exports.login = asyncErrorHandler(async (req, res, next) => {
    // const email = req.body.email;
    // const password = req.body.password;

    const { email, password } = req.body;

    if (!email || !password) {
        const error = new CustomError('Please provide email ID & Password for log in', 400);
        return next(error);
    }

    const user = await User.findOne({ email }).select('+password');

    // const isMatch = await user.comparePasswordInDb(password, user.password);

    if (!user || !(await user.comparePasswordInDb(password, user.password))) {
        const error = new CustomError('Incorrect email or password', 400);
        return next(error);
    }

    createSendResponse(user, 200, res);
});

exports.protect = asyncErrorHandler(async (req, res, next) => {
    //1. Read the token if it is exists

    const testToken = req.headers.authorization;
    let token;

    if (testToken && testToken.startsWith('Bearer')) {
        token = testToken.split(' ')[1];
    }
    if (!token) {
        next(new CustomError('You are not logged in!', 401));
    }

    //2. validate the token
    const decodedToken = await util.promisify(jwt.verify)(token, process.env.SECRET_STR);

    //3. If the user exists
    const user = await User.findById(decodedToken.id);
    if (!user) {
        const error = new CustomError('The user with the given token does not exist', 401);
        next(error);
    }

    //4. If the user changed password after the token was issued
    const isPasswordChanged = await user.isPasswordChanged(decodedToken.iat);
    if (isPasswordChanged) {
        const error = new CustomError('Password has been changed recently. Please log in again!', 401);
        next(error);
    };

    //5. Allow user access to route
    req.user = user;
    next();
});

exports.restrict = (role) => {
    // wrapper function
    return (req, res, next) => {
        if (req.user.role !== role) {
            const error = new CustomError('You do not have permission to perform this action', 403);
            next(error);
        }
        next();
    }
}

// exports.restrict = (...role) => {
//     // wrapper function
//     return (req, res, next) => {
//         if(!role.includes(req.user.role)) {
//             const error = new CustomError('You do not have permission to perform this action', 403);
//             next(error);
//         }
//         next();
//     }
// }

exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {
    // 1. GET USER BASED ON POSTED EMAIL
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        const error = new CustomError('We could not find the user with given email', 404);
        next(error);
    }

    // 2. GENERATE A RANDOM RESER TOKEN
    const resetToken = user.createResetPasswordToken();

    //! why we need to do this
    await user.save({ validateBeforeSave: false });

    // 3. SEND THE TOKEN BACK TO THE USER EMAIL
    const resetUrl = `${req.protocol}://${req.get('host')}/api/v1/users/resetPassword/${resetToken}`;
    const message = `We have received password reset request. Please use the below link to reset your password\n\n${resetUrl}\n\nThis reset password will be valid 10 minutes`;

    try {
        await sendEmail({
            email: user.email,
            subject: 'Password change request recieved',
            message
        });

        res.status(200).json({
            status: "success",
            message: "password link sent to the user email"
        })
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        user.save({validateBeforeSave: false});

        return next(new CustomError('There was an error sending password reset email. Please try again later.', 500))
    }

})

exports.resetPassword = asyncErrorHandler(async (req, res, next) => {
    const token = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({passwordResetToken: token, passwordResetTokenExpires: {$gt: Date.now()}})

    if(!user) {
        const error = new CustomError('Token is invalid or has expired', 400);
        next(error);
    }

    user.password = req.body.password;
    user.confirmPassword = req.body.confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.passwordChangedAt = Date.now();
    user.save()

    createSendResponse(user, 200, res);
})
