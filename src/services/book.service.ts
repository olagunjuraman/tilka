import { Book, Author } from "../database/models/index";
import { BookCreationAttributes } from "../interfaces/book.interface";
import { badRequestError } from "../middlewares/error.middleware";

export  default class BookService {
  async getAllBooks(): Promise<{ books: Book[] }> {
    const books = await Book.findAll({
      include: {
        model: Author,
        attributes: ["name"],
        'as': "author"
      },
      attributes: ["id", "title", "description"],
    });
    return { books };
  }

  async getBookById(bookId: string): Promise<{ book: Book }> {
    const book = await Book.findOne({
      where: { id: bookId },
      include: {
        model: Author,
        attributes: ["name"],
        as: "author"
      },
      attributes: ["id", "title", "description"],
    });

    if (!book) {
      throw badRequestError("Book not found");
    }

    return { book };
  }

  async addBook(input: BookCreationAttributes) {
    const { title, description, authorId } = input;
    const newBook = await Book.create({
      title,
      description,
      authorId,
    });
    return { book: newBook };
  }

  async updateBook(
    bookId: string,
    input: { title?: string; description?: string; authorId?: string }
  ): Promise<{ book: Book }> {
    const { title, description, authorId } = input;

    const book = await Book.findOne({
      where: { id: bookId },
    });

    if (!book) {
      throw badRequestError("Book not found");
    }

    book.title = title || book.title;
    book.description = description || book.description;
    book.authorId = authorId || book.authorId;
    await book.save();

    return { book };
  }

  async deleteBook(bookId: string): Promise<{ message: string }> {
    const book = await Book.findOne({
      where: { id: bookId },
    });

    if (!book) {
      throw badRequestError("Book not found");
    }

    await book.destroy();
    return { message: "Book deleted successfully" };
  }
}
