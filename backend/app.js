const express = require("express")
const cors = require("cors")

const routes = require('./app/routes')
const ApiError = require("./app/api-error");

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


routes(app);

// handle 404 response
app.use((req, res, next) => {
    return next(new ApiError(404, "Resource not found"));
});


module.exports = app;