const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize'); 

class Rol extends Sequelize.Model {};

Rol.init({
  IdRol: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  NombreDelRol: {
    allowNull: false,
    type: DataTypes.STRING,
    unique: true
  },
  Estado: {
    allowNull: false,
    type: DataTypes.BOOLEAN
  },
},{
    sequelize: db,
    modelName: 'Roles',
    tableName: 'roles',
    timestamps: true
});

module.exports = Rol;