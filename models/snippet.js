"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class snippet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      snippet.belongsTo(models.user);
      snippet.belongsTo(models.category);
    }
  }
  snippet.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: { type: DataTypes.TEXT, allowNull: false },
      comment: DataTypes.TEXT,
      userId: { type: DataTypes.INTEGER, allowNull: false },
      categoryId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "snippet",
    }
  );
  return snippet;
};
