const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize'); 


class Proveedores extends Sequelize.Model {};

Proveedores.init({
    IdProveedor: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  
  NombreProveedor: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  NombreContacto: {
    allowNull: false,
    type: DataTypes.STRING
  },
  Telefono: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  Correo: {
    allowNull: false,
    type: DataTypes.STRING
  }
  
},{
    sequelize: db,
    modelName: 'Proveedores',
    tableName: 'proveedores',
    timestamps: true
});

module.exports = Proveedores;
