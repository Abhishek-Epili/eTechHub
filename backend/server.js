require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require("mongoose");
const routes = require('./route/routes')

const app = express()

app.use(cors());
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/products', routes)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).
    then(() => {
        console.log("Database connected succesfully")
        app.listen(process.env.PORT, () => {
            console.log("Listening on port " + process.env.PORT)
        })
    }).
    catch((err) => { console.log("Error: " + err) })