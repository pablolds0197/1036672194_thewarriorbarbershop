const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize'); 
const Clientes = require('./clientes');
const Empleados = require('./empleados');
const Servicios = require('./servicios');

class Agenda extends Sequelize.Model {};

Agenda.init({
  IdAgenda: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  IdServicio: {
    type: DataTypes.INTEGER,
    references: {
      model: Servicios,
      key: 'IdServicio'
    }
  },
  IdEmpleado: {
    type: DataTypes.INTEGER,
    references: {
      model: Empleados,
      key: 'IdEmpleado'
    }
  },
  IdCliente: {
    type: DataTypes.INTEGER,
    references: {
      model: Clientes,
      key: 'IdCliente'
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
  Valor: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
},{
    sequelize: db,
    modelName: 'Agenda',
    tableName: 'agenda',
    timestamps: true
});

module.exports = Agenda;
    
