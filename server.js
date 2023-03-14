// Imports
//--------------------------------------------
require('./server/config/config');
const express = require('express')
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
const LoginController = require('./controllers/LoginController')
const RegisterController = require('./controllers/RegisterController')
//--------------------------------------------

// Configurations of the server
//--------------------------------------------
const app = express()
var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
//--------------------------------------------


// Routes of Register
//--------------------------------------------
app.get('/register', RegisterController.renderRegister)
app.post('/register', RegisterController.register)
//--------------------------------------------


// Routes of Login
//--------------------------------------------
app.get('/login', LoginController.renderLogin)
app.post('/login', LoginController.login)
//--------------------------------------------


// Render index view
//--------------------------------------------
let renderIndex = path.resolve(__dirname, './views/index.html');
app.get('/', (req, res) => {
  res.sendFile(renderIndex);
})
//--------------------------------------------


// Render welcome view
//--------------------------------------------
const renderWelcome = path.resolve(__dirname, './views/welcome.html');
app.get('/welcome', (req, res) => {
  res.sendFile(renderWelcome);
});
//--------------------------------------------


// Connect to database
//--------------------------------------------
mongoose.connect(process.env.urlDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Database working");
})
.catch((err) => {
  console.error(err);
});
//--------------------------------------------

app.listen(process.env.PORT, () => {
  console.log("Open port 3000")
})