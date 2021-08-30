import model from '../models';

const { Pessoa } = model;

export default {
  async insert (req, res) {
    const { nome, dataNascimento, idade, sexo, endereco } = req.body;
    try {
      await Pessoa.create({ nome, dataNascimento, idade, sexo, endereco });
      return res.status(201).send({message: 'Pessoa salva com sucesso!!'});
    } catch(e) {
      console.log(e);
      return res.status(400).send({message: 'Ocorreu um erro. Tente novamente mais tarde.'});
    }
  },
  async update (req, res) {
    try {
      await Pessoa.update(req.body, { where: { id: req.params.id } });
      return res.status(200).send({ message: 'Registro atualizado com sucesso.' });
    } catch (e) {
      return res.status(400).send({message: 'Ocorreu um erro. Tente novamente mais tarde.'});
    }
  },
  async findAll(req, res) {
    try {
      const pessoas =  await Pessoa.findAll({
        attributes: ['id', 'nome', 'dataNascimento', 'idade', 'sexo', 'endereco']
      });
      return res.status(200).send(pessoas);
    } catch (e) {
      return res.status(400).send({message: 'Ocorreu um erro. Tente novamente mais tarde.'});
    }
  },
  async findById(req, res) {
    try {
      const pessoa = await Pessoa.findOne({
        attributes: ['id', 'nome', 'dataNascimento', 'idade', 'sexo', 'endereco']
      }, { where: { id: req.params.id } });
      return res.status(200).send(pessoa);
    } catch (e) {
      return res.status(400).send({message: 'Ocorreu um erro. Tente novamente mais tarde.'});
    }
  },
  async removeById(req, res) {
    try {
      const pessoa = await Pessoa.findOne({ where: { id: req.params.id } });
      await pessoa.destroy();

      return res.status(204).send({ message: 'Registro removido com sucesso.'});
    } catch (e) {
      console.log(e);
      return res.status(400).send({message: 'Ocorreu um erro. Tente novamente mais tarde.'});
    }
  },
  async calcAge(born, today) {
    try {
      return Math.floor(Math.ceil(Math.abs(born.getTime() - today.getTime()) / (1000 * 3600 * 24)) / 365.25);
    } catch (e) {
      return res.status(400).send({message: 'Ocorreu um erro ao calcular a idade.'});
    }
  }
};
