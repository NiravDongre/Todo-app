require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const cors = require('cors');
const { main } = require('./app/src/config/config');
const { errorMiddleware } = require('./app/src/middlewares/error-middleware');
const { router } = require('./app/src/routes/main-route');


const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "app/src/public")))

app.use("/api/v1/", router);

app.use(errorMiddleware);

const PORT = process.env.PORT

main().then(() => {
    app.listen((PORT),() => {
        `The server is running on the ${PORT}`
    })
})

