const express = require('express')
const app = express()
const loginRouter = require('./login');
const registerRouter = require('./register');

app.use(express.json()); 
app.use(loginRouter); 
app.use(registerRouter)



module.exports = app;