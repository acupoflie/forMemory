
const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true
    },
    description: {
        type: String,
        required: [true, "Description is required"],
        trim: true
    },
    duration: {
        type: Number,
        required: [true, 'Duration time is required']
    }, 
    ratings: {
        type: Number,
        // default: 1.0
    },
    totalRating: {
        type: Number
    },
    releaseYear: {
        type: Number,
        required: [true, "Release year is required"]
    },
    releaseDate: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        // select: false - in order to exclude the prop from the responses
    },
    genres: {
        type: [String],
        required: [true, "Genres is required"]
    },
    directors: {
        type: [String], 
        required: [true, "Directors is required"]
    },
    coverImage: {
        type: String,
        required: [true, "Image is required"]
    },
    actors: {
        type: [String],
        required: [true, "Actors is required"]
    },
    price: {
        type: Number,
        required: [true, "Price is required"]
    }
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie;