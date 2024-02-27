const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize'); 
const Roles = require('./rol');

class Usuarios extends Sequelize.Model {};

Usuarios.init({
  IdUsuario: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  IdRol: {
    type: DataTypes.INTEGER,
    references: {
      model: Roles,
      key: 'IdRol'
    }
  },
  Usuario: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  Nombre: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Apellidos: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Celular: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true
  },
  Correo: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  Pass: {
    allowNull: false,
    type: DataTypes.STRING
  },
},{
    sequelize: db,
    modelName: 'Usuarios',
    tableName: 'usuarios',
    timestamps: true
});

module.exports = Usuarios;