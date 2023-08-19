const express = require('express');
const rpc = require('json-rpc2');

const app = express();
const port = 3000;

const client = rpc.Client.$create(8000, '127.0.0.1');

app.use(express.static('public'));

app.get('/reiniciar/nginx', (req, res) => {
    reiniciarServicio(['NGINX'], res);
});

app.get('/reiniciar/docker', (req, res) => {
    reiniciarServicio(['DOCKER'], res);
});

app.get('/reiniciar/ambos', (req, res) => {
    reiniciarServicio(['NGINX', 'DOCKER'], res);
});

function reiniciarServicio(servicios, res) {
   
    client.call('ReinicioServicio', servicios, (err, result) => {
        if (!err) {
            console.log('Resultado del reinicio: ', result);
            res.send('Servicios reiniciados exitosamente.');
        } else {
            console.error('Error al reiniciar servicios:', err);
            res.status(500).send('Error al reiniciar servicios.');
        }
    });
}

app.listen(port, () => {
    console.log(`Servidor web escuchando en el puerto ${port}`);
});