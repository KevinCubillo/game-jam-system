const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/User');
const app = express();

app.post('/register', function (req, res) {
  let body = req.body;
  let { nombre, email, password, role } = body;
  let User = new User({
    nombre,
    email,
    password: bcrypt.hashSync(password, 10),
    role
  });
User.save((err, UserDB) => {
    if (err) {
      return res.status(400).json({
         ok: false,
         err,
      });
    }
    res.json({
          ok: true,
          User: UserDB
       });
    })
});
module.exports = app;