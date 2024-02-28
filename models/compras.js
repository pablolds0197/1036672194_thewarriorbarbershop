const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize');
const Proveedor = require('./proveedores');


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
  FechaCompra: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  Total: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
},{
    sequelize: db,
    modelName: 'Compras',
    tableName: 'compras',
    timestamps: true
});

module.exports = Compras;