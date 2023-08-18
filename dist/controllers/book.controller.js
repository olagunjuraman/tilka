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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const book_service_1 = __importDefault(require("../services/book.service"));
const logger_1 = __importDefault(require("../logger"));
class BookController {
    constructor() {
        this.bookService = new book_service_1.default();
    }
    getAllBooks() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookService.getAllBooks();
            }
            catch (error) {
                logger_1.default.error(error);
                throw error;
            }
        });
    }
    getBookById(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookService.getBookById(bookId);
            }
            catch (error) {
                logger_1.default.error(error);
                throw error;
            }
        });
    }
    addBook(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookService.addBook(input);
            }
            catch (error) {
                logger_1.default.error(error);
                throw error;
            }
        });
    }
    updateBook(bookId, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookService.updateBook(bookId, input);
            }
            catch (error) {
                logger_1.default.error(error);
                throw error;
            }
        });
    }
    deleteBook(bookId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.bookService.deleteBook(bookId);
            }
            catch (error) {
                logger_1.default.error(error);
                throw error;
            }
        });
    }
}
exports.default = BookController;
//# sourceMappingURL=book.controller.js.map