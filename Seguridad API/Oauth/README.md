## Ejemplo de Uso Oauth
El siguiente ejemplo tiene como objetivo demostrar el uso de autenticación mediante Oauth y Bearer Token.

1. Instala las dependencias ejecutando el siguiente comando: `npm install body-parser express jsonwebtoken oauth2orize passport passport-http-bearer passport-oauth2 passport-oauth2-client-password`.
2. Ejecuta el archivo principal utilizando el comando: `node index.js`.
3. Visualiza la página accediendo a la siguiente URL: http://127.0.0.1:3000/.

Este ejemplo te proporcionará una idea de cómo utilizar una API en Node.js para autenticar mediante Oauth y JWT. Asegúrate de haber configurado correctamente las dependencias y de tener RabbitMQ en funcionamiento para que puedas observar el funcionamiento del ejemplo en tu navegador.

## Login
URL:       http://localhost:3000/login
<br/> Metodo:    POST
<br/> Cuerpo:    {"username": "admin", "password": "admin" }
<br/> Respuesta: { "token": ..... }

##Obtener Data
header:    'Authorization: Bearer  token....' 
<br/> URL:       http://localhost:3000/data
<br/> Metodo:    GET
<br/> Cuerpo:    
<br/> Respuesta: { "data": ..... }