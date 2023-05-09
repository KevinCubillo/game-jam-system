// Imports
//--------------------------------------------
const express = require('express');
const cors = require('cors');
const { router, notificationObserver } = require('./routes/index');

const app = express();
app.use(express.json());
//--------------------------------------------
app.use(cors());
app.use('/', router);
require('./database');

app.listen(3000);
console.log('Server running on port 3000');


