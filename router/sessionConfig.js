const express = require('express')
const sessionConfig = express()

session = require ('express-session');


sessionConfig.use(session({
    secret: '123456',
    resave: false,
    saveUninitialized: false,
}));


module.exports = sessionConfig;

