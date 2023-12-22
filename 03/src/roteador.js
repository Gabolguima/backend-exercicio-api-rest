const express = require("express");
const {
  listarLivros,
  listarLivroPorId,
  cadastrarLivro,
  alterarLivro,
  alterarDadosDoLivro,
  deletarLivro
} = require("./controladores/livrosController");

const rotas = express();

rotas.get("/livros", listarLivros);

rotas.get("/livros/:id", listarLivroPorId);

rotas.post("/livros", cadastrarLivro);

rotas.put("/livros/:id", alterarLivro);

rotas.patch("/livros/:id", alterarDadosDoLivro);

rotas.delete("/livros/:id", deletarLivro);

module.exports = rotas;