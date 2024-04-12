const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize'); 

class Gestionproducto extends Sequelize.Model {};

Gestionproducto.init({
  IdProducto: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  NombreProducto: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  Descripcion: {
    allowNull: false,
    type: DataTypes.STRING,
    default: "Sin descripción."
  },
  StockMax: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  StockMin: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  CantidadDisponible: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  PrecioUnitario: {
    allowNull: false,
    type: DataTypes.INTEGER
  },


},{
    sequelize: db,
    modelName: 'Gestionproductos',
    tableName: 'gestionproductos',
    timestamps: true
});

module.exports = Gestionproducto;


