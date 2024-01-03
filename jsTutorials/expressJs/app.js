

const { create } = require('domain');
const express = require('express');
const morgan = require('morgan');
const moviesRouter = require('./routes/movieRoutes');

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

// should come after all routes
app.all('*', (req, res, next) => {

    const err = new Error(`Can't find ${req.originalUrl} on the server`);
    err.status = 'fail';
    err.statusCode = 404;
    next(err);

    // res.status(404).json({
    //     status: "fail",
    //     message: `Can't find ${req.originalUrl} on the server`
    // })
})

// global error handling middleware
app.use((error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'errorr'
    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message
    })
})

module.exports = app;