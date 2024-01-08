
// let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));
// const fs = require('fs')


const Movie = require('../models/movieModel');
const ApiFeatures = require('../utils/apiFeatures');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError')


exports.getHighestRated = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = '-ratings';

    next();
}

exports.getAllMovies = asyncErrorHandler(async (req, res, next) => {

    const features = new ApiFeatures(Movie.find(), req.query)
        .sort()
        .filter()
        .limitFields()
        .paginate();
    const movies = await features.query;

    // for Mongoose 6.0 or less
    // const excludeFields = ['sort', 'page', 'limit', 'fields'];
    // // creating 'shallow copy' of a object with spread operator
    // const queryObj = {...req.query};

    // excludeFields.forEach((el) => {
    //     delete queryObj[el]
    // });

    // const movies = await Movie.find(queryObj);

    //? filtering by mongoose special commands
    // const movies = await Movie.find()
    //                 .where('duration')
    //                 .gte(req.query.duration)
    //                 .where('ratings')
    //                 .gte(req.query.ratings)
    //                 .where('price')
    //                 .lte(req.query.price)

    //? Filtering query strings
    // let queryStr = JSON.stringify(req.query)
    // queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`)
    // const queryObj = JSON.parse(queryStr);

    // let movies = await Movie.find(queryObj)
    //! these lines is important for Mongoose 7.0 or later
    // delete queryObj.sort
    // delete queryObj.fields
    // delete queryObj.page
    // delete queryObj.limit
    // let query = Movie.find(queryObj)

    //? Sorting logic
    // if(req.query.sort) {
    //     const sortBy = req.query.sort.split(',').join(' ');
    //     query = query.sort(sortBy)
    // } else {
    //     query = query.sort('-createdAt');
    // }

    //? Limiting fields
    // if(req.query.fields) {
    //     const fields = req.query.fields.split(',').join(' ');
    //     query = query.select(fields)
    // } else {
    //     query = query.select('-__v')
    // }

    //? Pagination
    // const page = +req.query.page || 1;
    // const limit = +req.query.limit || 10;
    // const skip = (page - 1) * limit;
    // query = query.skip(skip).limit(limit);

    // if(req.query.page) {
    //     const moviesCount = await Movie.countDocuments();
    //     if(skip >= moviesCount) {
    //         throw new Error('This page is not found!')
    //     }
    // }

    // const movies = await query;

    res.status(200).json({
        status: "succesfull",
        length: movies.length,
        data: {
            movies
        }
    })
})

exports.getMovie = asyncErrorHandler(async (req, res, next) => {
    // const movie = await Movie.find({_id: req.param.id})s

    const movie = await Movie.findById(req.params.id);

    if (!movie) {
        const error = new CustomError('Movie with that id is not found', 404);
        return next(error);
    }

    res.status(200).json({
        status: "succesfull",
        data: {
            movie
        }
    })
})

exports.createMovie = asyncErrorHandler(async (req, res, next) => {
    // const testMovie = new Movie({})
    // testMovie.save()

    // try {
    // } catch (err) {
    // const error = new CustomError(err.message, 400)
    // next(error);

    const movie = await Movie.create(req.body)

    res.status(201).json({
        status: "success",
        data: {
            movie
        }
    })
})

exports.updateMovie = asyncErrorHandler(async (req, res, next) => {

    const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!updateMovie) {
        const error = new CustomError('Movie with that id is not found', 404);
        return next(error);
    }

    res.status(200).json({
        status: "succesfull",
        data: {
            movie: updateMovie
        }
    })
})

exports.deleteMovie = asyncErrorHandler(async (req, res, next) => {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);

    if (!deletedMovie) {
        const error = new CustomError('Movie with that id is not found', 404);
        return next(error);
    }

    res.status(204).json({
        status: "successful",
        data: null
    })
})

// Aggregation
exports.getMovieStats = asyncErrorHandler(async (req, res, next) => {

    const stats = await Movie.aggregate([
        // { $match: {releaseDate: {$lte: new Date()}}},
        { $match: { ratings: { $gte: 4.5 } } },
        {
            $group: {
                _id: '$releaseYear', // all records groupping depends on this fields
                avgRating: { $avg: '$ratings' },
                avgPrice: { $avg: '$price' },
                minPrice: { $min: '$price' },
                maxPrice: { $max: '$price' },
                priceTotal: { $sum: '$price' },
                movieCount: { $sum: 1 } // adding +1 for each record
            }
        },
        { $sort: { minPrice: 1 } }
        // { $match: { maxPrice: {$gte: 60}} }
    ])

    res.status(200).json({
        status: "successful",
        length: stats.length,
        data: {
            stats
        }
    })
})

exports.getMovieByGenre = asyncErrorHandler(async (req, res, next) => {

    const genre = req.params.genre;
    const movies = Movie.aggregate([
        { $unwind: '$genres' },
        {
            $group: {
                _id: '$genres',
                movieCount: { $sum: 1 },
                movies: { $push: '$name' }
            }
        },
        { $addFields: { genre: "$_id" } },
        { $project: { _id: 0 } },
        { $sort: { movieCount: -1 } },
        // { $limit: 6}
        { $match: { genre: genre } }
    ])

    console.log(movies.pipeline().at(5).$match);


    const data = await movies;

    res.status(200).json({
        status: "successful",
        length: movies.length,
        data: {
            data
        }
    })
})


//! Working with json file instead of mongodb

//? checking does movie exist for id router
// exports.checkId = (req, res, next, value) => {

//     console.log('Movie id is ' + value);

//     let movie = movies.find(elem => elem.id === +value)

//     if (!movie) {
//         return res.status(404).json({
//             status: "fail",
//             message: `Cannot find movie with id ${value}`
//         })
//     }

//     next();
// }


//? checking does body exist in post method
// exports.validateBody = (req, res, next) => {
//     if(!req.body.name || !req.body.releaseYear) {
//         return res.status(400).json({
//             status: "fail",
//             message: "Not valid movie data"
//         })
//     }
//     next();
// }

//? get all movies
// exports.getAllMovies = (req, res) => {
//     res.status(200).json({
//         // Enveloping JSON data, JSEND format
//         status: "success",
//         requestedAt: req.requestedAt,
//         count: movies.length,
//         data: {
//             movies: movies
//         }
//     })
// }

//? getting movie by id
// exports.getMovie = (req, res) => {
//     // console.log(req.params);
//     const id = req.params.id * 1; // convert to number, also: +req.params.id

//     let movie = movies.find(elem => elem.id === id)

//     // if (!movie) {
//     //     return res.status(404).json({
//     //         status: "fail",
//     //         message: `Cannot find movie with id ${id}`
//     //     })
//     // }

//     res.status(200).json({
//         status: "success",
//         data: {
//             movie: movie
//         }
//     })

// }

//? creating movie
// exports.createMovie = (req, res) => {
//     // console.log(req.body)
//     const newID = movies[movies.length - 1].id + 1;

//     const newMovie = Object.assign({ id: newID }, req.body);
//     movies.push(newMovie)

//     fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
//         res.status(201).json({
//             status: "success",
//             data: {
//                 movie: newMovie
//             }
//         })
//     })
//     // res.send('Created')
// }

//? updating movie
// exports.updateMovie = (req, res) => {
//     const id = +req.params.id;
//     const movieToUpdate = movies.find(elem => elem.id === id);

//     // if (!movieToUpdate) {
//     //     return res.status(404).json({
//     //         status: "fail",
//     //         message: `Cannot find movie with id ${id}`
//     //     })
//     // }

//     const index = movies.indexOf(movieToUpdate);

//     Object.assign(movieToUpdate, req.body);

//     movies[index] = movieToUpdate;

//     fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
//         res.status(200).json({
//             status: "success",
//             data: {
//                 movie: movieToUpdate
//             }
//         })
//     })
// }

//? deleting movie
// exports.deleteMovie = (req, res) => {
//     const id = +req.params.id;
//     let movieToDelete = movies.find(el => el.id === id);

//     // if (!movieToDelete) {
//     //     return res.status(404).json({
//     //         status: "fail",
//     //         message: `Cannot find a movie with id ${id}`
//     //     })
//     // }

//     const index = movies.indexOf(movieToDelete);

//     movies.splice(index, 1);

//     fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
//         res.status(204).json({
//             status: "success",
//             data: {
//                 movie: null
//             }
//         })
//     })
// }
