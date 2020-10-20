/*********************Login API Rest******************/










## Se necesita tener instalado para su correcto uso y funcionamiento




-mongodb
-node
-postman o similar
-editor de textos a elección








## Instalar dependencias con el comando "npm i"
Librerias utilizadas:
    "bcrypt": "^5.0.0",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.10.0",
    "mongoose-unique-validator": "^2.0.3"
Librerias de desarrollo:
    "nodemon": "^2.0.4"






## En ambiente de desarrollo:
levantar mongodb
correr con "npm run dev"
Renombrar bbdd de desarrollo desde /config/config.js








## En ambiente productivo, configurar bbdd desde /config/config.js
## Crear variable de entorno para seed productivo








## En la carpeta /utils encontramos la colección de endpoints para importar desde Postman
(en los casos que se usa id como parámetro, cambiar el id de ejemplo de la colección por el correspondiente)
(una vez obtenido el token con el login, enviar en los headers para su autenticación)




## Controllers
En la carpeta /controllers tenemos los métodos dinámicos, reutilizables y configurables de una lógica básica de CRUD. 
En caso de necesitar otro tipo de logaritmo muy diferente se debe implementar otro modulo Controllers 


Estos también se pueden separar por tipo de httpRequest para hacerlo más maniobrable.






/************/
## 1er Uso




El endPoint de Crear usuario está protegido por token y requiere permisos de administración.
Para generar el 1er usuario debemos quitarle esta protección eliminando el parámetro del medio [authToken, validateRole] en /routes/usuario.js


El método POST es el único que puede o no estar con token, todos los demás métodos devuelven siempre al solicitante.
En caso de quitar protección modificar la devolución en /Controllers.


Para elegir entre deleteRegByState ó realDelete, selecciónar método en routes/usuario