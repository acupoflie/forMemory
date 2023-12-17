
// have to written befire app require
const dotenv = require('dotenv')
dotenv.config({path: './config.env'})

const app = require('./app')


console.log(process.env)

// CREATE SERVER
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("server has started");
})