
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');

const Movie = require('../models/movieModel')

dotenv.config({ path: './config.env' });

mongoose.connect(process.env.CONN_STR)
    .then((conn) => {
        console.log('import db connected')
    })
    .catch((err) => {
        console.log('from import error occured')
    })

// when running script from the command line the current directory being root
const movie = JSON.parse(fs.readFileSync('./data/movies.json', 'utf-8'));

const deleteMovies = async () => {
    try {
        await Movie.deleteMany()
        console.log('data successfully deleted')
    } catch (err) {
        console.log(err.message)
    }
    process.exit();
}

const importMovies = async () => {
    try {
        await Movie.create(movie)
        console.log('data successfully imported')
    } catch (err) {
        console.log(err.message)
    }
    process.exit();
}

if(process.argv[2] === '--import') {
    importMovies();
}
if(process.argv[2] === '--delete') {
    deleteMovies();
}