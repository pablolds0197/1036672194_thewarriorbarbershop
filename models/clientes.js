const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize');
const Usuarios = require('./usuarios');

class Clientes extends Sequelize.Model {};

Clientes.init({
  IdCliente: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  IdUsuario: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuarios,
      key: 'IdUsuario'
    }
  },
},{
    sequelize: db,
    modelName: 'Clientes',
    tableName: 'clientes',
    timestamps: true
});

module.exports = Clientes;