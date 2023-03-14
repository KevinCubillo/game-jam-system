const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('./../models/User');
const app = express();
const router = express.Router();



router.post('/login', function (req, res) {
   let body = req.body;
   let { email, password } = body;
 
   User.findOne({ email: email })
     .then((user) => {
       if (!user) {
         return res.status(400).json({
           ok: false,
           err: {
             message: 'User not found'
           }
         });
       }
 
       if (!bcrypt.compareSync(password, user.password)) {
         return res.status(400).json({
           ok: false,
           err: {
             message: 'Invalid password'
           }
         });
       }
 
       res.redirect('/welcome');
 
     })
     .catch((err) => {
       return res.status(500).json({
         ok: false,
         err: err.message
       });
     });
 
 });

module.exports = router;