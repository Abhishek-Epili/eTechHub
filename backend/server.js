require('dotenv').config();

const cors = require('cors');
const express = require('express');
const mongoose = require("mongoose");
const gadgetRoutes = require('./route/gadgetRoutes')
const userRoutes = require('./route/userRoutes')
const reviewRoutes = require('./route/reviewRoutes')
const getCountRoutes = require('./route/getCountRoutes')

const app = express()

app.use(cors());
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/products', gadgetRoutes)
app.use('/api/users', userRoutes)
app.use('/api/reviews', reviewRoutes)
app.use('/api/getCount',getCountRoutes)

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).
    then(() => {
        console.log("Database connected succesfully")
        app.listen(process.env.PORT, () => {
            console.log("Listening on port " + process.env.PORT)
        })
    }).
    catch((err) => { console.log("Error: " + err) })