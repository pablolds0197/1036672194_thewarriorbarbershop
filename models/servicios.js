const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize'); 

class Servicios extends Sequelize.Model {};

Servicios.init({
  idServicio: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  NombreDelServicio: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  Descripcion: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Comision: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  Precio: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
},{
    sequelize: db,
    modelName: 'Servicios',
    tableName: 'servicios',
    timestamps: true
});

module.exports = Servicios;
    
