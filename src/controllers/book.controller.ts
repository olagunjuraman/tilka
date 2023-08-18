import BookService from "../services/book.service";
import logger from "../logger";

export default class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  public async getAllBooks() {
    try {
      return await this.bookService.getAllBooks();
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  public async getBookById(bookId: string) {
    try {
      return await this.bookService.getBookById(bookId);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  public async addBook(input: any) {
    try {
      return await this.bookService.addBook(input);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  public async updateBook(bookId: string, input: any) {
    try {
      return await this.bookService.updateBook(bookId, input);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }

  public async deleteBook(bookId: string) {
    try {
      return await this.bookService.deleteBook(bookId);
    } catch (error) {
      logger.error(error);
      throw error;
    }
  }
}
