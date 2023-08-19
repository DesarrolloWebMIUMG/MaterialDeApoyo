const express = require('express');
const http = require('http');
const path = require('path');  // Añadir el módulo 'path' para manejar rutas de archivos

const app = express();
const server = http.createServer(app);

// Contadores para los votos de los candidatos
let candidateAVotes = 0;
let candidateBVotes = 0;

// Ruta para manejar las conexiones SSE
app.get('/votes', (req, res) => {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Simular el envío de eventos aleatorios
    const interval = setInterval(() => {
        if (Math.random() < 0.4) {
            candidateBVotes++;
        } else {
            candidateAVotes++;
        }

        const voteData = {
            candidateA: candidateAVotes,
            candidateB: candidateBVotes
        };

        res.write(`data: ${JSON.stringify(voteData)}\n\n`);
    }, 2000);

    // Manejar cierre de la conexión
    req.on('close', () => {
        clearInterval(interval);
    });
});

// Ruta para renderizar la página HTML index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

const port = 3000;
server.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
