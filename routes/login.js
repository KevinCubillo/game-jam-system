const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const app = express();


app.post('/login', (req, res) => {
    let body = req.body;

    User.findOne({ email: body.email }, (erro, UserDB)=>{
        if (erro) {
          return res.status(500).json({
             ok: false,
             err: erro
          })
       }
   // Verifica que exista un User con el mail escrita por el User.
      if (!UserDB) {
         return res.status(400).json({
           ok: false,
           err: {
               message: "User or password incorrect"
           }
        })
      }
   // Valida que la contraseña escrita por el User, sea la almacenada en la db
      if (! bcrypt.compareSync(body.password, UserDB.password)){
         return res.status(400).json({
            ok: false,
            err: {
              message: "User or password incorrect"
            }
         });
      }
   // Genera el token de autenticación
       let token = jwt.sign({
              User: UserDB,
           }, process.env.SEED_AUTENTICATION, {
           expiresIn: process.env.token_expiration
       })
       res.json({
           ok: true,
           User: UserDB,
           token,
       })
   })
})