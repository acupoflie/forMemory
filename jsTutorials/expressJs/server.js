
const mongoose = require('mongoose')
// have to written befire app require
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const app = require('./app')


// console.log(process.env)

mongoose.connect(process.env.CONN_STR).then((conn) => {
    console.log(conn)
    console.log("db connection successful")
}).catch((error) => {
    console.log("Some error has occured")
})

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true
    },
    description: String,
    duration: {
        type: Number,
        required: [true, 'Duration time is required']
    }, 
    ratings: {
        type: Number,
        default: 1.0
    }
})

const Movie = mongoose.model('Movie', movieSchema)

// const testMovie = new Movie({
//     name: "Interstellar",
//     description: "A film about space and another planets actually i dont know this movie as well",
//     duration: 180
// });

// testMovie.save()
//     .then((doc) => {console.log(doc)})
//     .catch((error) => {console.log("Error occured: " + error)})

// CREATE SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server has started");
})

// start mongodb as a background process
// mongod --config /usr/local/etc/mongod.conf --fork

// learning mongodb compassss