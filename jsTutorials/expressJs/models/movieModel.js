
const mongoose = require('mongoose')
const fs = require('fs');

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
    },
    createdBy: String
}, {
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
});

movieSchema.virtual('durationInHours').get(function() {
    return this.duration / 60;
})

// before the document saved in the database (here this keyword points current document)
movieSchema.pre('save', function(next) {
    this.createdBy = 'SIR';
    next();
});

// this middleware cant access 'this'
movieSchema.post('save', function(doc, next) {
    const content = `A new movie document name ${doc.name} has been created by ${doc.createdBy}\n`;
    fs.writeFileSync('./log/log.txt', content, {flag: 'a'}, (err) => console.log(err));
    next()
})

// QUERY MIDDLEWARE (here this keyword points the query object)
movieSchema.pre(/^find/, function(next) {
    this.find({ releaseDate: {$lte: Date.now()}})
    this.startTime = Date.now();
    next();
});

movieSchema.post(/^find/, function(docs, next) {
    this.find({ releaseDate: {$lte: Date.now()}});
    this.endTime = Date.now()

    const content = `Query took ${this.endTime - this.startTime} milliseconds to fetch the documents \n`
    fs.writeFileSync('./log/log.txt', content, {flag: 'a'}, (err) => console.log(err));
    next();
});

// agregate middleware 
movieSchema.pre('aggregate', function(next) {
    console.log(this.pipeline().unshift({$match: {releaseDate: {$lte: new Date()}}}))
    next();
})

const Movie = mongoose.model('Movie', movieSchema)

module.exports = Movie;