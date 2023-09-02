const express = require('express');
const passport = require('passport');
const BearerStrategy = require('passport-http-bearer').Strategy;
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;
const secretKey = 'DesarrolloWeb';
const Segundos  = 30

const users = [
  { id: 1, username: 'admin', password: 'admin' }
];

app.use(passport.initialize());

passport.use(new BearerStrategy((token, done) => {
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return done(null, false);
    }
    const user = users.find(u => u.id === decoded.user.id);
    if (!user) {
      return done(null, false);
    }
    return done(null, user, { scope: 'all' });
  });
}));

app.use(bodyParser.json());

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

app.get('/data', passport.authenticate('bearer', { session: false }), (req, res) => {
  res.json({ message: 'Información protegida', user: req.user });
});

app.listen(port, () => {
  console.log(`API corriendo en http://localhost:${port}`);
});
