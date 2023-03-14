const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../models/User');
const app = express();
const router = express.Router();

router.post('/register', function (req, res) {
  let body = req.body;
  let { nombre, email, password, role } = body;
  let newUser = new User({
    nombre,
    email,
    password: bcrypt.hashSync(password, 10),
    role
  });
  newUser.save()
    .then((UserDB) => {
      res.redirect('/welcome');
    })
    .catch((err) => {
      return res.status(400).json({
        ok: false,
        err: err.message,
      });
    });
});
module.exports = router;
