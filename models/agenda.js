const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize'); 
const Clientes = require('./clientes');
const Empleados = require('./empleados');

class Agenda extends Sequelize.Model {};

Agenda.init({
  IdAgenda: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  IdEmpleado: {
    type: DataTypes.INTEGER,
    references: {
      model: Clientes,
      key: 'IdCliente'
    }
  },
  IdCliente: {
    type: DataTypes.INTEGER,
    references: {
      model: Empleados,
      key: 'IdEmpleado'
    }
  },
  FechaAgenda: {
    allowNull: false,
    type: DataTypes.DATE
  },
  HoraAgenda: {
    allowNull: false,
    unique: true,
    type: DataTypes.TIME
  },
},{
    sequelize: db,
    modelName: 'Agenda',
    tableName: 'agenda',
    timestamps: true
});

module.exports = Agenda;
    
