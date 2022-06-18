require ('dotenv').config();
const express = require('express')
const app = express()
const hbs = require('hbs');
const port = process.env.PORT;
const session = require ('express-session');


//--PUNTO DE ACCESO--


//HANDLEBARS contenido dinámico
app.set('view engine', 'hbs'); //indica que vamos autilizar un motor de plantillas, hbs es el que vamos a utilizar
hbs.registerPartials(__dirname + '/views/partials');


/* --- middleware ----*/
app.use('/assets', express.static(__dirname + '/public')); // va a buscar los archivos en public
app.use(express.json());
app.use(express.urlencoded({ extended: false }));  //tratamiento de protocolos de POST Y GET 
app.use(session({
    secret: '123456',
    resave: true,
    saveUninitialized: true,

}))



app.use(require('./router/router'));  //requiere router
app.use(require('./router/contacto')); // requiere contacto para envio de mail






app.listen(port, () => {
    console.log(`Usando el puerto http://localhost:${port}`);
}) 
