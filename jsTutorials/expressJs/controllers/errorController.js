
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

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'errorr';

    if(process.env.NODE_ENV === 'development') {
        devErrors(res, error);
    } else if (process.env.NODE_ENV === 'production') {

        if(error.name === 'CastError') {
            error = castErrorhandler(error);
        }
        prodErrors(res, error);
    }
}