const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const path = require('path');

class LoginController {

  renderLogin(req, res) {
    let renderLogin = path.resolve(__dirname, './../views/login.html');
    res.sendFile(renderLogin);
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Buscar usuario por email
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'User not found'
          }
        });
      }

      // Comprobar que la contraseña sea válida
      if (!bcrypt.compareSync(password, user.password)) {
        return res.status(400).json({
          ok: false,
          err: {
            message: 'Invalid password'
          }
        });
      }

      // Generar token JWT
      const token = jwt.sign({ user }, 'secret-key', { expiresIn: '1h' });

      return res.redirect('/welcome');

    } catch (err) {
      return res.status(500).json({
        ok: false,
        err: err.message
      });
    }
  }

  loginWithToken(req, res) {
    let token = req.query.token;
    jwt.verify(token, 'secret-key', (err, decoded) => {
      if (err) {
        return res.status(401).json({
          ok: false,
          err: {
            message: 'Invalid token'
          }
        });
      }

      return res.redirect('/welcome');
    });
  }
  
}

module.exports = new LoginController();
