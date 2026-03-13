require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const path = require('path')
const { user } = require('./app/src/routes/route');
const { errorMiddleware } = require('./app/src/middleware/error-middleware');
const cors = require('cors')


const app = express();
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "app/src/public")))

app.use("/api/v1/user", user);

app.use(errorMiddleware);

async function main(){
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.MONGO_URL)
    .then(()=> {console.log("connected to db")})
    .catch(err => console.log(err))
}

main();

app.listen(3000)
