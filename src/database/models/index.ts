import { Sequelize } from "sequelize";
import User from "./user.model";
import Author from "./author.model";
import Book from "./book.model";
import config from "../../config/config";
import logger from "../../logger";

const sequelize = new Sequelize(config.db.url, config.db as any);

// Initialize Models
User.initialize(sequelize);
Author.initialize(sequelize);
Book.initialize(sequelize);

// Define Relationships
Author.associate();
Book.associate();

const resolvedConnection = () => logger.info("Connected to database!");

const rejectedConnection = (error: any) =>
  logger.info(`Failed to connect. Error: ${error}`);

sequelize.sync({ alter: true });

sequelize.authenticate().then(resolvedConnection).catch(rejectedConnection);

export { User, Author, Book };
