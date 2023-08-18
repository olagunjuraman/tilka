"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config/config"));
require("dotenv").config();
module.exports = {
    development: {
        username: config_1.default.db.username,
        password: config_1.default.db.password,
        database: config_1.default.db.database,
        host: config_1.default.db.host,
        dialect: config_1.default.db.dialect,
        pool: config_1.default.db.pool,
        dialectOptions: config_1.default.db.dialectOptions,
    },
};
//# sourceMappingURL=config.js.map