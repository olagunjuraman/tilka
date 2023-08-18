import { Request, Response, NextFunction, Router } from "express";
import { celebrate, Joi } from "celebrate";
import { protect } from "../middlewares/auth.middleware";
import BookController from "../controllers/book.controller";
import { successResponse } from "../utils/responseHelper";

class BookRoutes {
  public router: Router;
  private bookController: BookController;

  constructor(bookController: BookController) {
    this.router = Router();
    this.bookController = bookController;

    this.getBooks = this.getBooks.bind(this);
    this.createBook = this.createBook.bind(this);
    this.getBook = this.getBook.bind(this);
    this.updateBook = this.updateBook.bind(this);
    this.deleteBook = this.deleteBook.bind(this)
    this.routes();
  }

  private async getBooks(req: Request, res: Response, next: NextFunction) {
    try {
      const books = await this.bookController.getAllBooks();
      successResponse(res, books);
    } catch (error) {
      next(error);
    }
  }

  private async getBook(req: Request, res: Response, next: NextFunction) {
    try {
      const book = await this.bookController.getBookById(req.params.id);
      successResponse(res, book);
    } catch (error) {
      next(error);
    }
  }

  private async createBook(req: Request, res: Response, next: NextFunction) {
    try {
      const input = req.body;
      const book = await this.bookController.addBook(input);
      successResponse(res, book);
    } catch (error) {
      next(error);
    }
  }

  private async updateBook(req: Request, res: Response, next: NextFunction) {
    try {
      const input = req.body;
      const book = await this.bookController.updateBook(req.params.id, input);
      successResponse(res, book);
    } catch (error) {
      next(error);
    }
  }

  private async deleteBook(req: Request, res: Response, next: NextFunction) {
    try {
      await this.bookController.deleteBook(req.params.id);
      successResponse(res, { message: "Book deleted successfully" });
    } catch (error) {
      next(error);
    }
  }

  private routes() {
    this.router.route("/").get(this.getBooks);
    this.router.route("/:id").get(this.getBook);
    this.router.route("/").post(
      celebrate({
        body: Joi.object({
          title: Joi.string().required(),
          description: Joi.string().required(),
          authorId: Joi.string().uuid().required(),
        }),
      }),
      protect,
      this.createBook
    );
    this.router.route("/:id").put(
      celebrate({
        body: Joi.object({
          title: Joi.string().optional(),
          description: Joi.string().optional(),
          authorId: Joi.string().uuid().optional(),
        }),
      }),
      protect,
      this.updateBook
    );
    this.router.route("/:id").delete(protect, this.deleteBook);
  }
}

const bookController = new BookController();
export default new BookRoutes(bookController).router;
