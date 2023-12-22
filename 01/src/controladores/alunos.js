const alunos = require("../dados/alunos");

let idNovoAluno = 1;

const listarAlunos = (req, res) => {
  return res.status(200).json(alunos);
};

const detalharAluno = (req, res) => {
  const alunoById = Number(req.params.id);

  if (isNaN(alunoById)) {
    return res.status(400).json({
      mensagem: "O ID informado não é um número válido."
    });
  }

  const aluno = alunos.find((aluno) => {
    const alunoEncontrado = aluno.id === alunoById;
    return alunoEncontrado;
  });

  if (!aluno) {
    return res.status(404).json({
      mensagem: "O aluno não foi encontrado."
    });
  }

  return res.status(200).json(aluno);
};

const cadastrarAluno = (req, res) => {
  const {
    nome,
    sobrenome,
    idade,
    curso
  } = req.body;


  if (!nome || !sobrenome || !idade || !curso) {
    return res.status(400).json({
      mensagem: "Todos os campos são obrigatórios!"
    });
  }

  if (nome.trim() === "" || sobrenome.trim() === "" || curso.trim() === "") {
    return res.status(400).json({
      mensagem: "Os campos Nome, Sobrenome e Curso não podem estar vazios ou conter apenas espaços em branco."
    });
  }

  if (idade < 18) {
    return res.status(400).json({
      mensagem: "O aluno deve ser maior de idade."
    });
  }

  const novoAluno = {
    id: idNovoAluno,
    nome,
    sobrenome,
    idade,
    curso
  }

  alunos.push(novoAluno);
  idNovoAluno++;

  return res.status(201).send();
};

const deletarAluno = (req, res) => {
  const alunoById = Number(req.params.id);

  if (isNaN(alunoById)) {
    return res.status(400).json({
      mensagem: "O ID informado não é um número válido."
    });
  }

  const indiceDoAluno = alunos.findIndex((aluno) => {
    const alunoEncontrado = aluno.id === alunoById;
    return alunoEncontrado;
  });

  if (indiceDoAluno < 0) {
    return res.status(404).json({
      mensagem: "O aluno não foi encontrado."
    });
  }

  const alunoExcluido = alunos.splice(indiceDoAluno, 1)[0];

  return res.status(200).json(alunoExcluido);
};

module.exports = {
  listarAlunos,
  detalharAluno,
  cadastrarAluno,
  deletarAluno
}