
const app = require('./app')

// CREATE SERVER
const port = 5000;
app.listen(port, () => {
    console.log("server has started");
})