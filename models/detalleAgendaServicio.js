const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize'); 
const Agendas = require('./agenda');
const Servicio = require('./servicios');

class Agenda extends Sequelize.Model {};

Agenda.init({
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
      model: Agendas,
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

module.exports = Agenda;
    
