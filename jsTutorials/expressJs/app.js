

const express = require('express');
const fs = require('fs')

let app = express();
let movies = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

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



// CREATE SERVER
const port = 5000;
app.listen(port, () => {
    console.log("server has started");
})