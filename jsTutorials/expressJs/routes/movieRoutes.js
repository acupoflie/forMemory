
const express = require('express');
const moviesController = require('../controllers/moviesController');
const router = express.Router();

router.param('id', moviesController.checkId)

// Making routers in another way

// moviesRouter.route('/api/v1/movies')
router.route('/')
    .get(moviesController.getAllMovies)
    .post(moviesController.validateBody, moviesController.createMovie);

// moviesRouter.route('/api/v1/movies/:id')
router.route('/:id')
    .get(moviesController.getMovie)
    .patch(moviesController.updateMovie)
    .delete(moviesController.deleteMovie);

module.exports = router;