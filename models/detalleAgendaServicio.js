const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize'); 
const Agenda = require('./agenda');
const Servicio = require('./servicios');

class DetalleAgendaServicio extends Sequelize.Model {};

DetalleAgendaServicio.init({
  IdDetalleAgendaServicio: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  IdAgenda: {
    type: DataTypes.INTEGER,
    references: {
      model: Agenda,
      key: 'IdAgenda'
    }
  },
  IdServicio: {
    type: DataTypes.INTEGER,
    references: {
      model: Servicio,
      key: 'IdServicio'
    }
  },
  EstadoDeServicio: {
    allowNull: false,
    type: DataTypes.ENUM('Activo', 'Inactivo'),
    defaultValue: 'Activo'
  },
},{
    sequelize: db,
    modelName: 'DetalleAgendaServicio',
    tableName: 'detalleAgendaServicio',
    timestamps: true
});

module.exports = DetalleAgendaServicio;
    
