"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const book_model_1 = __importDefault(require("./book.model"));
class Author extends sequelize_1.Model {
    static associate() {
        this.hasMany(book_model_1.default, {
            foreignKey: "authorId",
            sourceKey: "id",
            as: "books",
        });
    }
    static initialize(sequelize) {
        this.init({
            id: {
                type: sequelize_1.DataTypes.UUID,
                primaryKey: true,
                defaultValue: sequelize_1.DataTypes.UUIDV4,
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Author",
            tableName: "authors",
            underscored: true,
            paranoid: true,
        });
    }
}
exports.default = Author;
//# sourceMappingURL=author.model.js.map