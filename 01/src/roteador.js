const express = require("express");
const {
  listarAlunos,
  detalharAluno,
  cadastrarAluno,
  deletarAluno
} = require("./controladores/alunos");

const rotas = express();

rotas.get("/alunos", listarAlunos);

rotas.get("/alunos/:id", detalharAluno);

rotas.post("/alunos", cadastrarAluno);

rotas.delete("/alunos/:id", deletarAluno);

module.exports = rotas;