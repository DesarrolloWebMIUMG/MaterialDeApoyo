const express = require('express');
const amqp = require('amqplib');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

const ip = '192.168.0.110';

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/send', async (req, res) => {
  const queue = req.body.queue;
  const message = req.body.message;

  try {
    const connection = await amqp.connect('amqp://' + ip);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);
    channel.sendToQueue(queue, Buffer.from(message));

    console.log(`Mensaje enviado a la cola "${queue}": ${message}`);

    await channel.close();
    await connection.close();

    res.redirect('/');
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
    res.status(500).send('Error al enviar el mensaje');
  }
});

app.get('/receive', async (req, res) => {
  const queue = req.query.queue;

  try {
    const connection = await amqp.connect('amqp://' + ip);
    const channel = await connection.createChannel();
    await channel.assertQueue(queue);
    const message = await channel.get(queue);

    if (message) {
      console.log(`Mensaje recibido de la cola "${queue}": ${message.content.toString()}`);
      await channel.ack(message);
      res.render('received', { message: message.content.toString() });
    } else {
      console.log(`No hay mensajes en la cola "${queue}"`);
      res.render('received', { message: `No hay mensajes en la cola "${queue}"` });
    }

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error al recibir el mensaje:', error);
    res.status(500).send('Error al recibir el mensaje');
  }
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
});
