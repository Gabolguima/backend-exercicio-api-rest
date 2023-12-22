const livros = require("../dados/livrosDB");

let novoId = 3;

const listarLivros = (req, res) => {
  return res.json(livros);
};

const listarLivroPorId = (req, res) => {
  const livroId = Number(req.params.id);

  if (isNaN(livroId)) {
    return res.status(400).json({
      mensagem: "O valor do parâmetro ID da URL não é um número válido."
    });
  }

  const livro = livros.find((livro) => {
    return livro.id === livroId;
  });

  if (!livro) {
    return res.status(404).json({
      mensagem: "Não existe livro para o ID informado."
    });
  }

  return res.status(200).json(livro);
};

const cadastrarLivro = (req, res) => {
  const {
    titulo,
    autor,
    ano,
    numPaginas
  } = req.body;

  if (!titulo || !autor || !ano || !numPaginas) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios!"
    });
  }

  const novoLivro = {
    id: novoId,
    titulo,
    autor,
    ano,
    numPaginas
  }

  livros.push(novoLivro);
  novoId++;

  return res.status(201).json(novoLivro);
};

const alterarLivro = (req, res) => {
  const {
    titulo,
    autor,
    ano,
    numPaginas
  } = req.body;

  if (!titulo || !autor || !ano || !numPaginas) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios!"
    });
  }

  const livroExistente = livros.find((livro) => {
    return livro.id === Number(req.params.id);
  });

  if (!livroExistente) {
    return res.status(404).json({
      mensagem: "Não existe livro a ser substituído para o ID informado."
    });
  }

  livroExistente.titulo = titulo;
  livroExistente.autor = autor;
  livroExistente.ano = ano;
  livroExistente.numPaginas = numPaginas;

  return res.status(200).json({
    mensagem: "Livro substituído."
  });
};

const alterarDadosDoLivro = (req, res) => {
  const { titulo, autor, ano, numPaginas } = req.body;

  const livroExistente = livros.find((livro) => {
    return livro.id === Number(req.params.id);
  });

  if (!livroExistente) {
    return res.status(404).json({
      mensagem: "Não existe livro a ser alterado para o ID informado."
    });
  }

  if (titulo) {
    livroExistente.titulo = titulo;
  }

  if (autor) {
    livroExistente.autor = autor;
  }

  if (ano) {
    livroExistente.ano = ano;
  }

  if (numPaginas) {
    livroExistente.numPaginas = numPaginas;
  }

  return res.status(200).json({
    mensagem: "Livro alterado."
  });
};

const deletarLivro = (req, res) => {
  const indiceDoLivro = livros.findIndex((livro) => {
    return livro.id === Number(req.params.id);
  });

  if (indiceDoLivro < 0) {
    return res.status(404).json({
      mensagem: "Não existe livro a ser removido para o ID informado."
    });
  }

  livros.splice(indiceDoLivro, 1);

  return res.status(200).json({
    mensagem: "Livro removido."
  });
};

module.exports = {
  listarLivros,
  listarLivroPorId,
  cadastrarLivro,
  alterarLivro,
  alterarDadosDoLivro,
  deletarLivro
}