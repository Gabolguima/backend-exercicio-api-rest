const express = require("express");
const roteador = require("./roteador");
const validarSenha = require("./intermediario");

const app = express();
const porta = 3000;

app.use(express.json());
app.use(validarSenha);
app.use(roteador);

app.listen(porta,
  console.log(`Servidor rodando na porta ${porta}.`)
);