const { Router } = require("express");  // Router Modulo propio de express
const router = new Router();


router.get("/", (req, res) => {   //renderizar contenido dinámico, no necesita ser indicada la ruta
    res.render('index', {
        nombre: 'Alejandro Guarracino',
        titulo: 'Instituto de Inglés Management'

    })
});


router.get("/classroom", (req, res) => {
    res.render('classroom')   

});

router.get("/nosotros", (req, res) => {
    res.render('nosotros', {
        nombre: 'Alejandro Guarracino',
        titulo: 'Instituto de Inglés'

    })    

});

router.get("/contacto", (req, res) => {
    res.render('contacto', {
        nombre: 'Alejandro Guarracino',
        titulo: 'Instituto de Inglés'

    })    

});


module.exports = router;