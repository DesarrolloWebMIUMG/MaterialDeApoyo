const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app       = express();
const port      = 3000;
const secretKey = 'desarrolloweb';
const Segundos  = 60;
app.use(bodyParser.json());


const users = [
  { id: 1, username: 'admin', password: 'admin' },
  { id: 2, username: 'user', password: 'user' }
];


function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (typeof token !== 'undefined') {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        res.sendStatus(403); // Forbidden
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const token = jwt.sign({ user }, secretKey, { expiresIn: Segundos+'s' });
    res.json({ token });
  } else {
    res.sendStatus(401); // Unauthorized
  }
});


app.get('/data', verifyToken, (req, res) => {
  res.json({ message: 'Información protegida', user: req.user });
});

app.listen(port, () => {
  console.log(`API corriendo en Puerto ${port}`);
});
