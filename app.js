// All dependencies
const express = require('express') // import express
const bodyParser = require('body-parser') // import body-parser
const mongoose = require('mongoose') // import mongoose for mongo db
const userRoutes = require('./routes/user') // import router user
const sauceRoutes = require('./routes/sauce') // import router sauce
const path = require('path')
const helmet = require('helmet') // Helmet is a set of middleware for security.

const app = express()

const result = require('dotenv').config() // dotenv is used for the .env file, it's a good practice for the security of sensitive datas

app.use(helmet()) // use middleware of Helmet

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.usqcx.gcp.mongodb.net/test` //uri database

mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !')) // catch database connection error

app.use((req, res, next) => { //CORS HEADERS
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    next();
});

app.use(bodyParser.json()) // Use body-parser to analyze body request data

app.use('/images', express.static(path.join(__dirname, 'images'))) // use express to generate the path of the image folder

app.use('/api/auth', userRoutes) // call the router userRoutes for the route /api/auth
app.use('/api/sauces', sauceRoutes) // call the router sauceRoutes for the route /api/sauces

module.exports = app