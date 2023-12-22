const express = require("express");
const {
  listagemEBuscaDeConvidados,
  cadastrarConvidado,
  deletarConvidado
} = require("./controladores/convidados");

const rotas = express();

rotas.get("/convidados", listagemEBuscaDeConvidados);

rotas.post("/convidados", cadastrarConvidado);

rotas.delete("/convidados/:nome", deletarConvidado);

module.exports = rotas;