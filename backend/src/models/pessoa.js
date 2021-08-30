const { Model } = require('sequelize');

export default (sequelize, DataTypes) => {
  class Pessoa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Pessoa.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'Campo nome é obrigatório',
      },
      unique: {
        args: true,
        msg: 'Nome já existe',
      },
    },
    idade: DataTypes.INTEGER,
    dataNascimento: DataTypes.DATE,
    sexo: DataTypes.STRING,
    endereco: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoa',
  });

  return Pessoa;
};
