const express = require('express')
const webserver = express()
 .use((req, res) =>
   res.sendFile('/index.html', { root: __dirname })
 )
 .listen(3000, () => console.log(`Escuchando en el purto ${3000}`))
const { WebSocketServer } = require('ws')
const sockserver = new WebSocketServer({ port: 443 })
sockserver.on('connection', ws => {
 console.log('Nuevo cliente conectado')
 ws.send('connection established')
 ws.on('close', () => console.log('Cliente desconectado'))
 ws.on('message', data => {
   sockserver.clients.forEach(client => {
     console.log(`Enviando mensaje: ${data}`)
     client.send(`${data}`)
   })
 })
 ws.onerror = function () {
   console.log('websocket error')
 }
})