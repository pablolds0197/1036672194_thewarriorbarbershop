const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize');
const Empleados = require('./empleados');
const Clientes = require('./clientes');
const Servicios = require('./servicios');

class Ventas extends Sequelize.Model {};

Ventas.init({
    IdVenta: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  CodFactura: {
    unique: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  IdServicio: {
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: Servicios,
      key: 'IdServicio'
    }
  },
  IdEmpleado: {
    type: DataTypes.INTEGER,
    references: {
      model: Empleados,
      key: 'IdEmpleado'
    }
  },
  IdCliente: {
    type: DataTypes.INTEGER,
    references: {
      model: Clientes,
      key: 'IdCliente'
    }
  },
  PrecioTotal: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
},{
    sequelize: db,
    modelName: 'Venta',
    tableName: 'venta',
    timestamps: true
});

module.exports = Ventas;