"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";

import Book from "./book.model";

export default class Author extends Model {


  static associate() {
    this.hasMany(Book, {
      foreignKey: "authorId",
      sourceKey: "id",
      as: "books",
    });
  }

  static initialize(sequelize: Sequelize) {
    this.init(
      {
        id: {
          type: DataTypes.UUID,
          primaryKey: true,
          defaultValue: DataTypes.UUIDV4,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Author",
        tableName: "authors",
        underscored: true,
        paranoid: true,
      }
    );
  }
}
