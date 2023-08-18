/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
const { v4: uuidv4 } = require("uuid");
const { QueryTypes } = require("sequelize");

const authors = [
  {
    id: uuidv4(),
    name: "Chinua Achebe",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Wole Soyinka",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: uuidv4(),
    name: "Chimamanda Ngozi Adichie",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },

];

module.exports = {
  up: async (queryInterface) => {
    for (const author of authors) {
      const existingAuthor = await queryInterface.sequelize.query(
        `SELECT * FROM "authors" WHERE "name" = :name`,
        {
          replacements: { name: author.name },
          type: QueryTypes.SELECT,
        }
      );
      if (!existingAuthor.length) {
        await queryInterface.bulkInsert("authors", [author], {
          ignoreDuplicates: true,
        });
      }
    }
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete("authors", null, {});
  },
};
