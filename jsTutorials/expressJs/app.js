

const { create } = require('domain');
const express = require('express');
const morgan = require('morgan');
const moviesRouter = require('./routes/movieRoutes');
const authRouter = require('./routes/authRouter')
const CustomError = require('./utils/CustomError');
const globalErrorHandler = require('./controllers/errorController')

let app = express();

// custom middleware
const logger = function(req, res, next) {
    console.log("custom middleware called");
    next();
}

// Using middlewares
app.use(express.json())
if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}
app.use(express.static('./public'))
app.use(logger)
app.use((req, res, next) => { 
    req.requestedAt = new Date().toISOString();
    next();
});

// app.get('/api/v1/movies', getAllMovies);
// app.get('/api/v1/movies/:id',getMovie);
// app.post('/api/v1/movies', createMovie);
// app.patch('/api/v1/movies/:id', updateMovie);
// app.delete('/api/v1/movies/:id', deleteMovie);

app.use('/api/v1/movies', moviesRouter);
app.use('/api/v1/users', authRouter);

// should come after all routes
app.all('*', (req, res, next) => {

    // res.status(404).json({
    //     status: "fail",
    //     message: `Can't find ${req.originalUrl} on the server`
    // })


    // const err = new Error(`Can't find ${req.originalUrl} on the server`);
    // err.status = 'fail';
    // err.statusCode = 404;


    const err = new CustomError(`Can't find ${req.originalUrl} on the server`, 404)

    next(err);
})

// global error handling middleware
app.use(globalErrorHandler);

module.exports = app;