

const express = require('express');
const fs = require('fs')

let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

app.use(express.json())

// GET request
app.get('/api/v1/movies', (req, res) => {
    res.status(200).json({
        // Enveloping JSON data, JSEND format
        status : "secces",
        count : movies.length,
        data : {
            movies : movies
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