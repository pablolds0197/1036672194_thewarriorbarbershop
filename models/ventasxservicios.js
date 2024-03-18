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
  IdVenta: {
    type: DataTypes.INTEGER,
    references: {
      model: Ventas,
      key: 'IdVenta'
    }
  },
  IdServicio: {
    type: DataTypes.INTEGER,
    references: {
      model: Servicios,
      key: 'IdServicio'
    }
  }
},{
    sequelize: db,
    modelName: 'DetalleVentaServicios',
    tableName: 'DetalleVentaServicios',
    timestamps: true
});

module.exports = Ventasxservicios;