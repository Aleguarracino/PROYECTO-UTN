

const { Router } = require("express");  // Router Modulo propio de express
const dbClassroom = new Router();
const mysql = require('mysql');



const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alejandro_guarracino'
})

conn.connect((err) => {
    if (err) throw err;
    console.log("PRIMER CONEXION ESTABLECIDA");
})




// CLASSROOM BASE DE DATOS --SELECT--

dbClassroom.get("/alumnos", (req, res) => {
    if (req.session.loggein){
        //res.render('alumnos', { username: req.session.username});
    

    const user = req.session.my_variable;
    //delete req.session.my_variable;
    let sql = "SELECT * FROM estudiantes"; //nombre de la tabla
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('alumnos', {
            results: results,
            user
        });
    });
} 
    else{
        res.redirect("/");
    }

});


//CLASSROOM BASE DE DATOS --INSERT--

dbClassroom.post('/save', (req, res) => {
    let data = { estudiantes_nombre: req.body.estudiantes_nombre, estudiantes_apellido: req.body.estudiantes_apellido, estudiantes_fk_id_nivel: req.body.estudiantes_fk_id_nivel };
    let sql = "INSERT INTO estudiantes SET ?"; //nombre de la tabla
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('alumnos'); //Consultar por qué da error con res.render
    });
    
});


//UPDATE 
dbClassroom.post('/update', (req, res) => {
    let sql = "UPDATE estudiantes SET estudiantes_nombre= '" + req.body.estudiantes_nombre + "', estudiantes_apellido='" + req.body.estudiantes_apellido + "', estudiantes_fk_id_nivel='" + req.body.estudiantes_fk_id_nivel + "' WHERE estudiantes_id=" + req.body.id;
    
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('alumnos'); 
    });
});

//DELETE 
dbClassroom.post('/delete', (req, res) => {
    let sql = "DELETE from estudiantes WHERE estudiantes_id= "  + req.body.estudiantes_id + "";
    
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('alumnos'); 
    });
});

/*
dbClassroom.get("*", (req, res) => {
    res.render('404')    
});

*/

module.exports = dbClassroom;