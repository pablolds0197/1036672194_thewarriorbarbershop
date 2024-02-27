const db = require('../config/config');
const { Sequelize, DataTypes } = require('sequelize'); 
const ConceptoGasto = require('./conceptogasto');

class GastosOperativos extends Sequelize.Model {};

GastosOperativos.init({
    IdGastosOperativo: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER
  },
  IdConceptoGasto: {
    type: DataTypes.INTEGER,
    references: {
      model: ConceptoGasto,
      key: 'IdConceptoGasto'
    }
  },
  FechaDelGasto: {
    allowNull: false,
    type: DataTypes.DATE,
    unique: true
  },
  TotalDelGasto: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  
},{
    sequelize: db,
    modelName: 'GastosOperativos',
    tableName: 'gastosoperativos',
    timestamps: true
});

module.exports = GastosOperativos;