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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../database/models/index");
const error_middleware_1 = require("../middlewares/error.middleware");
class BookService {
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            const books = yield index_1.Book.findAll({
                include: {
                    model: index_1.Author,
                    attributes: ["name"],
                    'as': "author"
                },
                attributes: ["id", "title", "description"],
            });
            return { books };
        });
    }
    getBookById(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield index_1.Book.findOne({
                where: { id: bookId },
                include: {
                    model: index_1.Author,
                    attributes: ["name"],
                    as: "author"
                },
                attributes: ["id", "title", "description"],
            });
            if (!book) {
                throw (0, error_middleware_1.badRequestError)("Book not found");
            }
            return { book };
        });
    }
    addBook(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, authorId } = input;
            const newBook = yield index_1.Book.create({
                title,
                description,
                authorId,
            });
            return { book: newBook };
        });
    }
    updateBook(bookId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, description, authorId } = input;
            const book = yield index_1.Book.findOne({
                where: { id: bookId },
            });
            if (!book) {
                throw (0, error_middleware_1.badRequestError)("Book not found");
            }
            book.title = title || book.title;
            book.description = description || book.description;
            book.authorId = authorId || book.authorId;
            yield book.save();
            return { book };
        });
    }
    deleteBook(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            const book = yield index_1.Book.findOne({
                where: { id: bookId },
            });
            if (!book) {
                throw (0, error_middleware_1.badRequestError)("Book not found");
            }
            yield book.destroy();
            return { message: "Book deleted successfully" };
        });
    }
}
exports.default = BookService;
//# sourceMappingURL=book.service.js.map