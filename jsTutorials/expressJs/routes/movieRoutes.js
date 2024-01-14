
const express = require('express');
const moviesController = require('../controllers/moviesController');
const router = express.Router();
const authController = require('../controllers/authController');

// param middleware
// router.param('id', moviesController.checkId)

router.route('/highest-rated')
    .get(moviesController.getHighestRated, moviesController.getAllMovies);

router.route('/movie-stats')
    .get(moviesController.getMovieStats);

router.route('/movies-by-genre/:genre')
.get(moviesController.getMovieByGenre);

// Making routers in another way

// moviesRouter.route('/api/v1/movies')
router.route('/')
    .get(authController.protect, moviesController.getAllMovies)
    // .post(moviesController.validateBody, moviesController.createMovie);
    .post(moviesController.createMovie)

// moviesRouter.route('/api/v1/movies/:id')
router.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie);

module.exports = router;