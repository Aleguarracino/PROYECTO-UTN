const mysql = require('mysql');




const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alejandro_guarracino'
})

connection.connect((err) => {
    if (err) throw err;
    console.log("CONEXION A BASE DE DATOS ESTABLECIDA");
})



module.exports = connection;
