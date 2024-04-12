const db = require("../config/config");
const { Sequelize, DataTypes } = require("sequelize");

class ConceptoGasto extends Sequelize.Model {}

ConceptoGasto.init(
  {
    IdConceptoGasto: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
      type: DataTypes.INTEGER,
    },
    NombreDelGasto: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    Descripcion: {
      allowNull: false,
      type: DataTypes.STRING,
      default: "Sin descripción.",
    },
    ValorDelGasto: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "ConceptoGasto",
    tableName: "conceptogasto",
    timestamps: true,
  }
);

module.exports = ConceptoGasto;
