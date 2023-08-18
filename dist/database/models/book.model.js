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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const author_model_1 = __importDefault(require("./author.model"));
class Book extends sequelize_1.Model {
    static associate() {
        this.belongsTo(author_model_1.default, {
            foreignKey: "authorId",
            targetKey: "id",
            as: "author",
        });
    }
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
            authorId: {
                type: sequelize_1.DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "authors",
                    key: "id",
                },
                onDelete: "CASCADE",
                onUpdate: "CASCADE",
            },
        }, {
            sequelize,
            modelName: "Book",
            tableName: "books",
            underscored: true,
            paranoid: true,
        });
    }
}
exports.default = Book;
//# sourceMappingURL=book.model.js.map