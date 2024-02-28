const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize');
const IdProveedor = require('./proveedores');


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
      model: Proveedores,
      key: 'Idprovedor'
    }
  },
  FechaCom: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  Total: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
},{
    sequelize: db,
    modelName: 'Compra',
    tableName: 'Compra',
    timestamps: true
});

module.exports = Compras;