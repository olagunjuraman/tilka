// import { Model, DataTypes, Sequelize } from "sequelize";
// import Author from "./author.model";
// import { BookAttributes, BookInstance } from "../interfaces/book.interface"

// class Book extends Model<BookAttributes, BookInstance> implements BookAttributes {
//   public id!: string; // Note that the `null assertion` `!` is required
//   public title!: string;
//   public description!: string;
//   public authorId!: string;

//     static associate() {
//     this.belongsTo(Author, {
//       foreignKey: "authorId",
//       targetKey: "id",
//       as: "author",
//     });
//   }

//   static initialize(sequelize: Sequelize) {
//     const attributes = {
//       id: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4,
//       },
//       title: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       description: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       authorId: {
//         type: DataTypes.UUID,
//         allowNull: false,
//         references: {
//           model: "authors",
//           key: "id",
//         },
//         onDelete: "CASCADE",
//         onUpdate: "CASCADE",
//       },
//     };

//     this.init(attributes, {
//       sequelize,
//       modelName: "Book",
//       tableName: "books",
//       underscored: true,
//       paranoid: true,
//     });
//   }
// }

// export default Book;

"use strict";
import { Model, DataTypes, Sequelize } from "sequelize";
import Author from "./author.model";
import {
  BookAttributes,
  BookCreationAttributes,
  BookInstance,
} from "../../interfaces/book.interface";

export default class Book
  extends Model<BookAttributes, BookCreationAttributes>
  implements BookAttributes
{
  id!: string;
  title!: string;
  description!: string;
  authorId!: string;

  static associate() {
    this.belongsTo(Author, {
      foreignKey: "authorId",
      targetKey: "id",
      as: "author",
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
        title: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        description: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        authorId: {
          type: DataTypes.UUID,
          allowNull: false,
          references: {
            model: "authors",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
      },
      {
        sequelize,
        modelName: "Book",
        tableName: "books",
        underscored: true,
        paranoid: true,
      }
    );
  }
}
