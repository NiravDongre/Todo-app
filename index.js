require('dotenv').config()
const express = require('express'); 
const mongosanitize = require("express-mongo-sanitize")
const helmet = require("helmet")
const ratelimit = require("express-rate-limit")
const cors = require('cors');
const { main } = require('./app/src/config/config');
const { errorMiddleware } = require('./app/src/middlewares/error-middleware');
const { router } = require('./app/src/routes/main-route');

const app = express();

app.use(helmet());

const limit = ratelimit({
    max: 1000,
    windowMs: 60 * 60* 1000,
    message: "We have recieved too many req from this IP. Pls try again after one hour"
})

app.use(express.json());
app.use(mongosanitize());
app.use(cors());

app.use("/api/v1", limit)
app.use("/api/v1/", router);

app.use(errorMiddleware);

const PORT = process.env.PORT

main().then(() => {
    app.listen((PORT),() => {
        console.log(`The server is running on the ${PORT}`)
    })
})

