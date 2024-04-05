const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize');
const Proveedor = require('./proveedores');
const Producto = require('./gestionproductos'); // Importa el modelo Producto


class Compras extends Sequelize.Model {};

Compras.init({
    IdCompra: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  IdProveedor: {
    type: DataTypes.INTEGER,
    references: {
      model: Proveedor,
      key: 'IdProvedores'
    }
  },
  IdProducto: {
    type: DataTypes.INTEGER,
    references: {
      model: Producto,
      key: 'IdProducto'
    }
  },
  NumeroFactura: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  FechaRegistro:{
    allowNull: false,
    type:DataTypes.DATE
  },
  SubTotal:{
    allowNull:false,
    type:DataTypes.INTEGER
  },  
},
{
    sequelize: db,
    modelName: 'Compras',
    tableName: 'compras',
    timestamps: true
});

module.exports = Compras;