const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize');
const Roles = require('./rol');
const Permisos = require('./permisos');

class Rolesxpermiso extends Sequelize.Model {};

Rolesxpermiso.init({
  IdRolesxpermiso: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  IdRol: {
    type: DataTypes.INTEGER,
    references: {
      model: Roles,
      key: 'IdRol'
    }
  },
  IdPermiso: {
    type: DataTypes.INTEGER,
    references: {
      model: Permisos,
      key: 'IdPermiso'
    }
  }
},{
    sequelize: db,
    modelName: 'Rolesxpermisos',
    tableName: 'Rolesxpermisos',
    timestamps: true
});

module.exports = Rolesxpermiso;