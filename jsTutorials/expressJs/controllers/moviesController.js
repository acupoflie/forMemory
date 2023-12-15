
const fs = require('fs')

let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

// checking does movie exist for id router
exports.checkId = (req, res, next, value) => {

    console.log('Movie id is ' + value);

    let movie = movies.find(elem => elem.id === +value)

    if (!movie) {
        return res.status(404).json({
            status: "fail",
            message: `Cannot find movie with id ${value}`
        })
    }

    next();
}

// checking does body exist in post method
exports.validateBody = (req, res, next) => {
    if(!req.body.name || !req.body.releaseYear) {
        return res.status(400).json({
            status: "fail",
            message: "Not valid movie data"
        })
    }
    next();
}

// get all movies
exports.getAllMovies = (req, res) => {
    res.status(200).json({
        // Enveloping JSON data, JSEND format
        status: "success",
        requestedAt: req.requestedAt,
        count: movies.length,
        data: {
            movies: movies
        }
    })
}

// getting movie by id
exports.getMovie = (req, res) => {
    // console.log(req.params);
    const id = req.params.id * 1; // convert to number, also: +req.params.id

    let movie = movies.find(elem => elem.id === id)

    // if (!movie) {
    //     return res.status(404).json({
    //         status: "fail",
    //         message: `Cannot find movie with id ${id}`
    //     })
    // }

    res.status(200).json({
        status: "success",
        data: {
            movie: movie
        }
    })

}

// creating movie
exports.createMovie = (req, res) => {
    // console.log(req.body)
    const newID = movies[movies.length - 1].id + 1;

    const newMovie = Object.assign({ id: newID }, req.body);
    movies.push(newMovie)

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            status: "success",
            data: {
                movie: newMovie
            }
        })
    })
    // res.send('Created')
}

// updating movie
exports.updateMovie = (req, res) => {
    const id = +req.params.id;
    const movieToUpdate = movies.find(elem => elem.id === id);

    // if (!movieToUpdate) {
    //     return res.status(404).json({
    //         status: "fail",
    //         message: `Cannot find movie with id ${id}`
    //     })
    // }

    const index = movies.indexOf(movieToUpdate);

    Object.assign(movieToUpdate, req.body);

    movies[index] = movieToUpdate;

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(200).json({
            status: "success",
            data: {
                movie: movieToUpdate
            }
        })
    })
}

// deleting movie
exports.deleteMovie = (req, res) => {
    const id = +req.params.id;
    let movieToDelete = movies.find(el => el.id === id);

    // if (!movieToDelete) {
    //     return res.status(404).json({
    //         status: "fail",
    //         message: `Cannot find a movie with id ${id}`
    //     })
    // }

    const index = movies.indexOf(movieToDelete);

    movies.splice(index, 1);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: "success",
            data: {
                movie: null
            }
        })
    })
}
