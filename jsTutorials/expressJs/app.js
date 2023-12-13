

const express = require('express');
const fs = require('fs')

let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

app.use(express.json())

// GET request
app.get('/api/v1/movies', (req, res) => {
    res.status(200).json({
        // Enveloping JSON data, JSEND format
        status : "success",
        count : movies.length,
        data : {
            movies : movies
        }
    })
})

// GET with route parameter
app.get('/api/v1/movies/:id', (req, res) => {
    // console.log(req.params);
    const id = req.params.id * 1; // convert o number, also: +req.params.id

    let movie = movies.find(elem => elem.id === id)

    if(!movie) {
        return res.status(404).json({
            status: "fail",
            message: `Movie with ID ${id} not found`

        })
    }

    res.status(200).json({
        status: "success",
        data : {
            movie: movie
        }
    })
})

// POST request
app.post('/api/v1/movies', (req, res) => {
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
})

// CREATE SERVER
const port = 5000;
app.listen(port, () => {
    console.log("server has started");
})