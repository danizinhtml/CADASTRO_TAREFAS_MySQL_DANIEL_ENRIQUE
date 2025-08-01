const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("cadastro_tarefas","tarefas_user","123456",{
  host: "localhost",
  dialect: "mysql",
  timestamp: false
});

module.exports = sequelize;