const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./database');
const routes = require('./routes/index');

app.use(express.json());
app.use(cors()); 
app.use('/api', require('./routes/index'));

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync();
  })
  .then(() => {
    console.log('Database & tables created!');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(error => {
    console.error('Unable to connect to the database:', error);
  });

