"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = exports.Author = exports.User = void 0;
const sequelize_1 = require("sequelize");
const user_model_1 = __importDefault(require("./user.model"));
exports.User = user_model_1.default;
const author_model_1 = __importDefault(require("./author.model"));
exports.Author = author_model_1.default;
const book_model_1 = __importDefault(require("./book.model"));
exports.Book = book_model_1.default;
const config_1 = __importDefault(require("../../config/config"));
const logger_1 = __importDefault(require("../../logger"));
const sequelize = new sequelize_1.Sequelize(config_1.default.db.url, config_1.default.db);
// Initialize Models
user_model_1.default.initialize(sequelize);
author_model_1.default.initialize(sequelize);
book_model_1.default.initialize(sequelize);
// Define Relationships
author_model_1.default.associate();
book_model_1.default.associate();
const resolvedConnection = () => logger_1.default.info("Connected to database!");
const rejectedConnection = (error) => logger_1.default.info(`Failed to connect. Error: ${error}`);
sequelize.sync({ alter: true });
sequelize.authenticate().then(resolvedConnection).catch(rejectedConnection);
//# sourceMappingURL=index.js.map