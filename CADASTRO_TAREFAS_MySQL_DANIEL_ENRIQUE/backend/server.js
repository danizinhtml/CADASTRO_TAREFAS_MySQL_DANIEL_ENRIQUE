const express = require("express");
const app = express();
const cors = require("cors");
const tarefaRoutes = require("./routes/tarefaRoutes");
const sequelize = require("./database/db");

//midlleware
app.use(cors());
app.use(express.json());

//rotas
app.use("/tarefas",tarefaRoutes);

//Sincronização com o banco de dados
sequelize.sync()
    .then(()=>{
      console.log('Banco de dados sincronizado com sucesso')
      app.listen(3000, ()=>{
        console.log('Servidor rodando em http//localhost')
      });
    })
    .catch((error)=>{
      console.error('Erro ao conectar ao banco de dados: ',error)
    });