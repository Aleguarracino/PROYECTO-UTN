const { Router } = require("express");  // Router Modulo propio de express
const nodemailer = require("nodemailer");
const contacto = new Router();



contacto.get("/contacto", (req, res) => {
    res.render("contacto");
})


contacto.post("/enviar-email", async (req, res) => {
    const { nombre, apellido, email, asunto, mensaje } = req.body;
    
    
    //Validar el formulario

    if (!nombre || !email || !mensaje){
        return res.render('formulario', { error: 'Todos los campos son obligatorios' });
    }


    let transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        }
    });


    let mailOptions = {
        to: "123@gmail.com",
        from: "Remitente",
        subject: `${asunto}`,
        text: `Nombre: ${nombre}
        Apellido: ${apellido}
        Mensaje: ${mensaje}
        Contacto: ${email}`,
    };

    /*
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            res.status(500).send(error.message);
        } else {
            res.render('enviado');
            res.status(200).json(reqbody);
        }

    });
    */

//Try.catch estructura de control para manejar errores y excepciones

try{
    //Enviar correo electrónico
    await transporter.sendMail(mailOptions);
    res.render('enviado',{
        nombre: req.body.nombre
    });
} catch (error){
    console.log(error);
    res.render('contacto', { error: 'Error al enviar mensaje'});
}
    
    });




module.exports = contacto;