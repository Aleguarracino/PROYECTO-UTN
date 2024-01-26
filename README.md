# Proyecto Diplomatura Full Stack UTN

Este proyecto utiliza Node.js, la librería express, el motor de plantillas hbs, dotenv, express-session, mysql, nodemailer, boostrap y css.
Son necesarios para su ejecución los módulos de Apache y Mysql.
Se han utilizado partials para el header y footer.
Su estructura consta de cinco páginas, home, nosotros, classroom y alumnos.
Para poder acceder a la página alumnos se debe iniciar sesión en el classroom. Con ese fin se implementa una validación mediante base de datos y la utilización de express-session. 

Estructua de la base de datos relacional:  
Se utiliza una base de datos relacional con tres tablas: una correspondiente a los alumnos, la misma contiene una llave foránea hacia una tabla llamada "Niveles", 
con los distintos niveles de inglés estipulados. La última tabla corresponde al usuario y constraseña correcto para el inicio de sesión en el classroom.

Variables de entorno:
Las siguientes son las variables de entorno que deben configurarse en un archivo .env 

PORT 

Para la transferencia de correo en la página de contacto:

SMTP_HOST  
SMTP_PORT 
SMTP_USER  
SMTP_PASS  
