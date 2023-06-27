//SESION

const { Router } = require("express");  // Router Modulo propio de express
const session = new Router();
const connection = require("../database");




session.post("/login", (req, res) => {

    const { username, password } = req.body;
    const sql = ` SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;
    connection.query(sql, (err, results) => {
        if(err) throw err;
        if (results.length > 0){
            req.session.loggein = true;
            req.session.username = username;
            res.redirect('/alumnos');
        } else{
            res.render('classroom', {
                mensaje: "Usuario o contraseña incorrecto"
                            
            });
                        
        }
    });

});




session.get("/logout", (req, res) => {
    req.session.destroy();
    //res.redirect('/classroom');
    res.render('classroom', {
        mensajeDesconeccion: "Usuario desconectado"
                    
    });
    });


session.get("*", (req, res) => {
    res.render('404')    
});



module.exports = session;

