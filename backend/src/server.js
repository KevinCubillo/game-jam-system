// Imports
//--------------------------------------------
const express = require('express');
const cors = require('cors');
const app = express();


require('./database');


//--------------------------------------------

// Configurations of the server
//--------------------------------------------
app.use(cors());
app.use(express.json());
app.listen(3000);
console.log('Server running on port 3000');

//--------------------------------------------

