const convidados = [
  "Carlos",
  "Amanda",
  "Fernanda",
  "Juliana",
  "Lucas",
  "Roberto",
]

const listagemEBuscaDeConvidados = (req, res) => {
  if (!req.query.nome) {
    return res.json(convidados);
  }

  const convidadoBuscado = convidados.find((convidado) => {
    return convidado === req.query.nome;
  });

  if (!convidadoBuscado) {
    return res.status(404).json({
      mensagem: "O convidado buscado não está presente na lista."
    });
  }

  return res.status(200).json({
    mensagem: "Convidado presente."
  });
};

const cadastrarConvidado = (req, res) => {
  const { nome } = req.body;

  if (!nome) {
    res.status(400).json({
      mensagem: "O campo nome é obrigatório!"
    });
  }

  const convidadoExistente = convidados.find((convidado) => {
    return convidado === nome;
  });

  if (convidadoExistente) {
    return res.status(400).json({
      mensagem: "O nome do convidado a ser adicionado já existe na lista. Caso queria adicionar outro convidado de mesmo nome, favor fornecer o sobrenome também."
    });
  }

  convidados.push(nome);

  return res.status(201).json({
    mensagem: "Convidado adicionado."
  });
};

const deletarConvidado = (req, res) => {
  const { nome } = req.params;

  const indiceConvidadoExistente = convidados.findIndex((convidado) => {
    return convidado === nome;
  });

  if (indiceConvidadoExistente < 0) {
    return res.status(404).json({
      mensagem: "O nome do convidado a ser removido não existe na lista. Nenhum convidado foi removido."
    });
  }

  convidados.splice(indiceConvidadoExistente, 1);

  return res.json({
    mensagem: "Convidado removido."
  });
};

module.exports = {
  listagemEBuscaDeConvidados,
  cadastrarConvidado,
  deletarConvidado
}