## Ejemplo de Uso de JSON Web Token
El siguiente ejemplo tiene como objetivo demostrar el uso JWT en una API.

1. Instala las dependencias ejecutando el siguiente comando: `npm install body-parser  express jsonwebtoken`.
2. Ejecuta el archivo principal utilizando el comando: `node index.js`.
3. Visualiza la página accediendo a la siguiente URL: http://127.0.0.1:3000/.

Este ejemplo te proporcionará una idea de cómo implementar una API utilizando NodeJs y JWT. Asegúrate de haber configurado correctamente las dependencias y de tener RabbitMQ en funcionamiento para que puedas observar el funcionamiento del ejemplo en tu navegador.

##Login
URL:       http://localhost:3000/login
Metodo:    POST
Cuerpo:    {"username": "admin", "password": "admin" }
Respuesta: { "token": ..... }

##Obtener Data
header:    authorization: "token...."
URL:       http://localhost:3000/data
Metodo:    GET
Cuerpo:    
Respuesta: { "data": ..... }
