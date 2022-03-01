const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('./../models/usuario');
const app = express();

app.post('/register', function (req, res) {
  let body = req.body;
  let { name, appat, apmat, email, user, password, role } = body;
  let usuario = new Usuario({
    name,
    appat,
    apmat,
    user,
    email,
    password: bcrypt.hashSync(password, 10),
    role
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.redirect("../../menu.html");

  })
});

module.exports = app;