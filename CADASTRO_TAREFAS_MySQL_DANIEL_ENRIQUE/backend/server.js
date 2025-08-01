const express = require("express");
const app = express();
const cors = require("cors");
const tarefaRoutes = require("./routes/tarefaRoutes");
const sequelize = require("./database/db");
const Tarefa = require("./models/Tarefa");

app.use(cors());
app.use(express.json());
app.use(tarefaRoutes);

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000");
  });
});
