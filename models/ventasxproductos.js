const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize');
const Ventas = require('./ventas');
const Productos = require('./gestionproductos');

class Ventasxproductos extends Sequelize.Model {};

Ventasxproductos.init({
    IdDetalleVentaProductos: {
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
  IdProducto: {
    type: DataTypes.INTEGER,
    references: {
      model: Productos,
      key: 'IdProducto'
    }
  }
},{
    sequelize: db,
    modelName: 'DetalleVentaProductos',
    tableName: 'DetalleVentaProductos',
    timestamps: true
});

module.exports = Ventasxproductos;