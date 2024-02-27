const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize'); 

class Permiso extends Sequelize.Model {};

Permiso.init({
  IdPermiso: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  NombreDelPermiso: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  Descripcion: {
    allowNull: false,
    type: DataTypes.STRING
  },
},{
    sequelize: db,
    modelName: 'Permisos',
    tableName: 'Permisos',
    timestamps: true
});

module.exports = Permiso;