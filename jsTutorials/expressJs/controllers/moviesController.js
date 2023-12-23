
// let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));
// const fs = require('fs')


const Movie = require('../models/movieModel')


exports.getAllMovies = async (req, res) => {
    try {

        // for Mongoose 6.0 or less
        // const excludeFields = ['sort', 'page', 'limit', 'fields'];
        // // creating 'shallow copy' of a object with spread operator
        // const queryObj = {...req.query};

        // excludeFields.forEach((el) => {
        //     delete queryObj[el]
        // });

        // const movies = await Movie.find(queryObj);

        // const movies = await Movie.find()
        //                 .where('duration')
        //                 .equals(req.query.duration)
        //                 .where('ratings')
        //                 .equals(req.query.ratings);

        const movies = await Movie.find(req.query)

        res.status(200).json({
            status: "succesfull",
            length: movies.length,
            data: {
                movies
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.getMovie = async (req, res) => {
    // const movie = await Movie.find({_id: req.param.id})
    try {
        const movie = await Movie.findById(req.params.id)

        res.status(200).json({
            status: "succesfull",
            data: {
                movie
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.createMovie = async (req, res) => {
    // const testMovie = new Movie({})
    // testMovie.save()
    try {
        const movie = await Movie.create(req.body)

        res.status(201).json({
            status: "success",
            data: {
                movie
            }
        })
    } catch (err) {
        res.status(400).json({
            status: "fail",
            message: err.message
        })
    }

}

exports.updateMovie = async (req, res) => {
    try {
        const updateMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        res.status(200).json({
            status: "succesfull",
            data: {
                movie: updateMovie
            }
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}

exports.deleteMovie = async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);

        res.status(204).json({
            status: "successful",
            data: null
        })
    } catch (err) {
        res.status(404).json({
            status: "fail",
            message: err.message
        })
    }
}



// // checking does movie exist for id router
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


// // checking does body exist in post method
// exports.validateBody = (req, res, next) => {
//     if(!req.body.name || !req.body.releaseYear) {
//         return res.status(400).json({
//             status: "fail",
//             message: "Not valid movie data"
//         })
//     }
//     next();
// }

// get all movies
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

// // getting movie by id
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

// // creating movie
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

// // updating movie
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

// // deleting movie
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
