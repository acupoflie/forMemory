
const fs = require('fs')

let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

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

exports.getMovie = (req, res) => {
    // console.log(req.params);
    const id = req.params.id * 1; // convert to number, also: +req.params.id

    let movie = movies.find(elem => elem.id === id)

    if (!movie) {
        return res.status(404).json({
            status: "fail",
            message: `Cannot find movie with id ${id}`
        })
    }

    res.status(200).json({
        status: "success",
        data: {
            movie: movie
        }
    })

}

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

exports.updateMovie = (req, res) => {
    const id = +req.params.id;
    const movieToUpdate = movies.find(elem => elem.id === id);

    if (!movieToUpdate) {
        return res.status(404).json({
            status: "fail",
            message: `Cannot find movie with id ${id}`
        })
    }

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

exports.deleteMovie = (req, res) => {
    const id = +req.params.id;
    let movieToDelete = movies.find(el => el.id === id);

    if (!movieToDelete) {
        return res.status(404).json({
            status: "fail",
            message: `Cannot find a movie with id ${id}`
        })
    }

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
