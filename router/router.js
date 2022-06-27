const { Router } = require("express");  // Router Modulo propio de express
const router = new Router();
const mysql = require('mysql');

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'instituto'
})

conn.connect((err) => {
    if (err) throw err;
    console.log("CONEXION ESTABLECIDA");
})

//SELECT




router.get("/", (req, res) => {   //renderizar contenido dinámico, no necesita ser indicada la ruta
    res.render('index', {
        nombre: 'Alejandro Guarracino',
        titulo: 'Instituto de Inglés'

    })
});

router.get("/classroom", (req, res) => {
    res.render('classroom', {
        nombre: 'Alejandro Guarracino',
        titulo: 'Instituto de Inglés'

    })    //renderizar contenido dinámico, no necesita ser indicada la ruta

});

router.get("/nosotros", (req, res) => {
    res.render('nosotros', {
        nombre: 'Alejandro Guarracino',
        titulo: 'Instituto de Inglés'

    })    

});

// CLASSROOM BASE DE DATOS --SELECT--

router.get("/alumnos", (req, res) => {
    const user = req.session.my_variable;
    delete req.session.my_variable;
    let sql = "SELECT * FROM estudiantes"; //nombre de la tabla
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.render('alumnos', {
            results: results,
            user
        });
    });

});


//CLASSROOM BASE DE DATOS --INSERT--

router.post('/save', (req, res) => {
    let data = { estudiantes_nombre: req.body.estudiantes_nombre, estudiantes_apellido: req.body.estudiantes_apellido, estudiantes_fk_id_nivel: req.body.estudiantes_fk_id_nivel };
    let sql = "INSERT INTO estudiantes SET ?"; //nombre de la tabla
    let query = conn.query(sql, data, (err, results) => {
        if (err) throw err;
        res.redirect('alumnos'); //Consultar por qué da error con res.render
    });
});


//UPDATE 
router.post('/update', (req, res) => {
    let sql = "UPDATE estudiantes SET estudiantes_nombre= '" + req.body.estudiantes_nombre + "', estudiantes_apellido='" + req.body.estudiantes_apellido + "', estudiantes_fk_id_nivel='" + req.body.estudiantes_fk_id_nivel + "' WHERE estudiantes_id=" + req.body.id;
    
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('alumnos'); //Consultar por qué da error con res.render
    });
});

//DELETE 
router.post('/delete', (req, res) => {
    let sql = "DELETE from estudiantes WHERE estudiantes_id= "  + req.body.estudiantes_id + "";
    
    let query = conn.query(sql, (err, results) => {
        if (err) throw err;
        res.redirect('alumnos'); //Consultar por qué da error con res.render
    });
});




//SESION

router.post("/registro", (req, res) => {
    req.session.my_variable = req.body;
    res.redirect('/alumnos')
})




/* CONSULTAR  ERROR 404 no me permite ir a contacto porque no se encuentra en router, se encuentra en contacto js

router.get("*", (req, res) => {
    res.render('404')    
});
*/

module.exports = router;