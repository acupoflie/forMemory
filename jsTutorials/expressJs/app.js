

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
app.use(morgan('dev'))
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

app.use('/api/v1/movies', moviesRouter)

module.exports = app;