const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize'); 
const Usuarios = require('./usuarios');

class Empleados extends Sequelize.Model {};

Empleados.init({
  IdEmpleado: {
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
  PorcentajeGanancias: {
    allowNull: false,
    type: DataTypes.INTEGER,
    unique: true
  },
  
},{
    sequelize: db,
    modelName: 'Empleados',
    tableName: 'empleados',
    timestamps: true
});

module.exports = Empleados;