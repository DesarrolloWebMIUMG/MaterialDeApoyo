const express = require('express');
const bodyParser = require('body-parser');
const speakeasy = require('speakeasy');
const QRCode = require('qrcode');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

const users = {
  codigo: {
    secret: 'Clase de Desarrollo Web',
  },
};

app.get('/setup', (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });
  users.codigo.secret = secret.base32;
  QRCode.toDataURL(secret.otpauth_url, (err, data_url) => {
    res.render('qrcode', {
      qrImage: data_url,
    });
  });
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  const { token } = req.body;
  const verified = speakeasy.totp.verify({
    secret: users.codigo.secret,
    encoding: 'base32',
    token,
  });
  
  if (verified) {
    res.render('loginResult', {
      title: 'Login Exitoso',
      message: '¡El inicio de sesión ha sido exitoso!',
    });
  } else {
    res.render('loginResult', {
      title: 'Token Inválido',
      message: 'El token proporcionado es inválido. Por favor, verifica el token e intenta nuevamente.',
    });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
