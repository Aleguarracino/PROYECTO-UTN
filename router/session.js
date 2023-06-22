//SESION

const { Router } = require("express");  // Router Modulo propio de express
const session = new Router();
const mysql = require('mysql');



const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alejandro_guarracino'
})

connection.connect((err) => {
    if (err) throw err;
    console.log("CONEXION A USUARIOS ESTABLECIDA");
})


/*
session.post("/login", (req, res) => {   //FORMULARIO CLASSROOM
    req.session.my_variable = req.body;
    res.redirect('/alumnos')
});

*/

session.post("/login", (req, res) => {
    /*if(!req.body || !req.body.username || !req.body.password){
        res.send ("Usuario invalido");
        return
    }
*/
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

/*
session.get("/alumnos", (req, res) => {
    if (req.session.loggein){
        res.render('/alumnos', { username: req.session.username});
    } else{
        res.redirect("/");
    }
});
*/


session.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect('/classroom');
    });


session.get("*", (req, res) => {
    res.render('404')    
});

/*
// Ruta para api peliculas

app.use ('/movies', movieRoutes );



*/


module.exports = session;

