import config from "../config/config";

require("dotenv").config();

module.exports = {
  development: {
    username: config.db.username,
    password: config.db.password,
    database: config.db.database,
    host: config.db.host,
    dialect: config.db.dialect,
    pool: config.db.pool,
    dialectOptions: config.db.dialectOptions,
  },
};
