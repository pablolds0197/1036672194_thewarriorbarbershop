const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize'); 
const Producto = require('./gestionproductos');
const Compra = require('./compras');
class DetalleProductosCompras extends Sequelize.Model {};

DetalleProductosCompras.init({
  IdDetalleProductosCompras: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  IdProducto: {
    type: DataTypes.INTEGER,
    references: {
      model: Producto,
      key: 'IdProducto'
    }
  },
  IdCompra: {
    type: DataTypes.INTEGER,
    references: {
      model: Compra,
      key: 'IdCompra'
    }
  },
  NumeroFactura: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  TotalCompra: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
},{
    sequelize: db,
    modelName: 'DetalleProductosCompras',
    tableName: 'detalleProductosCompras',
    timestamps: true
});

module.exports = DetalleProductosCompras;
    
