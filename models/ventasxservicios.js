const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize');
const Ventas = require('./ventas');
const Servicios = require('./servicios');

class Ventasxservicios extends Sequelize.Model {};

Ventasxservicios.init({
    IdDetalleVentaServicios: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  IdRol: {
    type: DataTypes.INTEGER,
    references: {
      model: Ventas,
      key: 'IdVenta'
    }
  },
  IdPermiso: {
    type: DataTypes.INTEGER,
    references: {
      model: Servicios,
      key: 'idServicio'
    }
  }
},{
    sequelize: db,
    modelName: 'Ventasxservicios',
    tableName: 'ventasxservicios',
    timestamps: true
});

module.exports = Ventasxservicios;