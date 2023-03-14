require('./server/config/config');

const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');
var publicPath = path.resolve(__dirname, 'public');
app.use(express.static(publicPath));

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

app.use(require('./routes/index'));

let renderIndex = path.resolve(__dirname, './views/index.html');

app.get('/', (req, res) => {
  res.sendFile(renderIndex);
})

let renderRegister = path.resolve(__dirname, './views/register.html');

app.get('/register', (req, res) => {
  res.sendFile(renderRegister);
})

let renderLogin = path.resolve(__dirname, './views/login.html');

app.get('/login', (req, res) => {
  res.sendFile(renderLogin);
})

const renderWelcome = path.resolve(__dirname, './views/welcome.html');

app.get('/welcome', (req, res) => {
  res.sendFile(renderWelcome);
});

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

app.listen(process.env.PORT, () => {
  console.log("Open port 3000")
})