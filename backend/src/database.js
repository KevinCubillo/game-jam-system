const Sequelize = require('sequelize');
const sequelize = new Sequelize('mysql://root:root@localhost:3306/admin', {
  dialect: 'mysql',
  dialectOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  define: {
    timestamps: false,
  },
});

module.exports = sequelize;








