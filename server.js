require('./server/config/config');

const express = require('express')
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const path = require('path');

app.use(bodyParser.urlencoded({ extended: false}))

app.use(bodyParser.json())

app.use(require('./routes/index'));

let renderHTML = path.resolve(__dirname, './views/login.html');

app.get('/', (req, res) => {
  res.sendFile(renderHTML);
})

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