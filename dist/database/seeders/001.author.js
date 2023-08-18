/* eslint-disable @typescript-eslint/no-var-requires */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    up: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        for (const author of authors) {
            const existingAuthor = yield queryInterface.sequelize.query(`SELECT * FROM "authors" WHERE "name" = :name`, {
                replacements: { name: author.name },
                type: QueryTypes.SELECT,
            });
            if (!existingAuthor.length) {
                yield queryInterface.bulkInsert("authors", [author], {
                    ignoreDuplicates: true,
                });
            }
        }
    }),
    down: (queryInterface) => __awaiter(void 0, void 0, void 0, function* () {
        yield queryInterface.bulkDelete("authors", null, {});
    }),
};
//# sourceMappingURL=001.author.js.map