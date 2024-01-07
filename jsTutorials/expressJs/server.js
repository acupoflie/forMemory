
// have to written befire app require
const dotenv = require('dotenv')
dotenv.config({ path: './config.env' })

const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
    console.log(err.name, err.message);
    console.log("Uncaught exception occured! Shutting down....");
    process.exit(1);
});

const app = require('./app')


// console.log(process.env)

mongoose.connect(process.env.CONN_STR).then((conn) => {
    // console.log(conn)
    console.log("db connection successful")
});
// .catch((error) => {
//     console.log("Some error has occured")
// })



// CREATE SERVER
const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
    console.log("server has started");
});

process.on('unhandledRejection', (err) => {
    console.log(err.name, err.message);
    console.log("Unhandled rejection occured! Shutting down....");

    server.close(() => {
        process.exit(1);
    });
});



// start mongodb as a background process
// mongod --config /usr/local/etc/mongod.conf --fork

// learning mongodb compassss