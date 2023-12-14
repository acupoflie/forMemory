

const { create } = require('domain');
const express = require('express');
const fs = require('fs')
const morgan = require('morgan')

let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

// custom middleware
const logger = function(req, res, next) {
    console.log("custom middleware called")
    next();
}

// Using middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(logger)
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
})

const getAllMovies = (req, res) => {
    res.status(200).json({
        // Enveloping JSON data, JSEND format
        status : "success",
        requestedAt : req.requestedAt,
        count : movies.length,
        data : {
            movies : movies
        }
    })
}

const getMovie = (req, res) => {
    // console.log(req.params);
    const id = req.params.id * 1; // convert to number, also: +req.params.id

    let movie = movies.find(elem => elem.id === id)

    if(!movie) {
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

const createMovie = (req, res) => {
    // console.log(req.body)
    const newID = movies[movies.length - 1].id + 1;

    const newMovie = Object.assign({id: newID}, req.body);
    movies.push(newMovie)

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(201).json({
            status : "success",
            data : {
                movie: newMovie
            }
        })
    })
    // res.send('Created')
}

const updateMovie = (req, res) => {
    const id = +req.params.id;
    const movieToUpdate = movies.find(elem => elem.id === id);

    if(!movieToUpdate) {
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
            data : {
                movie: movieToUpdate
            }
        })
    })
}

const deleteMovie = (req, res) => {
    const id = +req.params.id;
    let movieToDelete = movies.find(el => el.id === id);

    if(!movieToDelete) {
        return res.status(404).json({
            status: "fail",
            message : `Cannot find a movie with id ${id}`
        })
    }

    const index = movies.indexOf(movieToDelete);

    movies.splice(index, 1);

    fs.writeFile('./data/movies.json', JSON.stringify(movies), (err) => {
        res.status(204).json({
            status: "success",
            data : {
                movie: null
            }
        })
    })
}


// app.get('/api/v1/movies', getAllMovies);
// app.get('/api/v1/movies/:id',getMovie);
// app.post('/api/v1/movies', createMovie);
// app.patch('/api/v1/movies/:id', updateMovie);
// app.delete('/api/v1/movies/:id', deleteMovie);

// Making routers in another way
app.route('/api/v1/movies')
    .get(getAllMovies)
    .post(createMovie);

app.route('/api/v1/movies/:id')
    .get(getMovie)
    .patch(updateMovie)
    .delete(deleteMovie);


// CREATE SERVER
const port = 5000;
app.listen(port, () => {
    console.log("server has started");
})