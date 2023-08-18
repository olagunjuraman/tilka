import request from "supertest";
import express, { Express } from "express";
import { BookRoutes } from "../routes/book.routes"; 
import { BookService } from "../services/book.service"; 
import db from "../database/models"; 

let app: Express;

beforeAll(() => {
  app = express();
  app.use(express.json());
  const bookService = new BookService();
  const bookRoutes = new BookRoutes(bookService);
  app.use("/books", bookRoutes.router);
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("BookRoutes", () => {
  it("should retrieve all books", async () => {
    const response = await request(app).get("/books");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("books");
    expect(response.body.books).toBeInstanceOf(Array);
  });

  // More tests for other endpoints
});
