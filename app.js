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
    resave: false,
    saveUninitialized: false,
}));



app.use(require('./router/router'));  //requiere router
app.use(require('./router/contacto')); // requiere contacto para envio de mail
app.use(require('./router/dbClassroom'));
app.use(require('./router/session'));




/*
app.post("/login", (req, res) => {
    if(!req.body || !req.body.username || !req.body.password){
        res.send ("Usuario invalido");
        return
    }

    const { username, password } = req.body;
    const sql = ` SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    connection.query(sql, (err, results) => {
        if(err) throw err;
        if (results.length > 0){
            req.session.loggein = true;
            req.session.username = username;
            res.redirect('/alumnos');
        } else{
            res.send ("Usuario o contraseña incorrecto")
        }
    });

});

app.get("/alumnos", (req, res) => {
    if (req.session.loggein){
        res.render('/alumnos', { username: req.session.username});
    } else{
        res.redirect("/");
    }
});

app.get("/logout", (req, res) => {
    req.session.destroy();
        res.redirect('/classroom');
});



*/





app.listen(port, () => {
    console.log(`Usando el puerto http://localhost:${port}`);
}) 
