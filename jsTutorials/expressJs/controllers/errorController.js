
const CustomError = require ('../utils/CustomError')

const devErrors = (res, error) => {
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
        stackTrace: error.stack,
        error: error
    })
}

const prodErrors = (res, error) => {
    if(error.isOperational) {
        res.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message
        })
    } else {
        res.status(500).json({
            status: "error",
            message: "Something went wrong, please try again later"
        })
    }
}

const castErrorhandler = (err) => {
    const msg = `Invalid value for ${err.path}: ${err.value}`
    return new CustomError(msg, 400); 
}

const duplicateKeyErrorHandler = (err) => {
    const msg = `There is already a movie with name ${err.keyValue.name}`
    return new CustomError(msg, 400)
}

const validationErrorHandler = (err) => {
    const errors = Object.values(err.errors).map(val => val.message);
    const errorMessages = errors.join('. ');
    const msg = `Invalid input data: ${errorMessages}`;

    return new CustomError(msg, 400);
};

const handleExpiredJWT = (err) => {
    return new CustomError('JWT has expired. Please log in again!', 401);
};

const handleJWTError = (error) => {
    return new CustomError('Invalid JSON or invalid token. Please log in again!', 401);
}

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'errorr';

    if(process.env.NODE_ENV === 'development') {
        devErrors(res, error);
    } else if (process.env.NODE_ENV === 'production') {
        //! name is not enumerable variable so that for shallow copy we have to point it
        // let err = {...error, name: error.name}

        if(error.name === 'CastError') error = castErrorhandler(error);
        if(error.code === 11000) error = duplicateKeyErrorHandler(error);
        if(error.name === 'ValidationError') error = validationErrorHandler(error);
        if(error.name === 'TokenExpiredError') error = handleExpiredJWT(error);
        if(error.name === 'JsonWebTokenError') error = handleJWTError(error);

        prodErrors(res, error);
    }
}