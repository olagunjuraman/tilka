import request from "supertest";
import express, { Express } from "express";
import AuthRoutes from "../routes/auth.routes"; // Make sure to update the import path
import AuthService from "../services/auth.service";
import db from "../database/models";

let app: Express;

beforeAll(() => {
  app = express();
  app.use(express.json());
  const authService = new AuthService();
  const authRoutes = new AuthRoutes(authService);
  app.use("/auth", authRoutes.router);
});

afterAll(async () => {
  await db.sequelize.close();
});

describe("AuthService", () => {
  it("should login an existing user and return a token", async () => {
    const userCredentials = {
      email: "test@example.com",
      password: "testPassword",
    };
    const response = await request(app)
      .post("/auth/login")
      .send(userCredentials);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("user");
    expect(response.body).toHaveProperty("token");
  });

  it("should not login a user with an invalid email", async () => {
    const userCredentials = {
      email: "invalid@example.com",
      password: "testPassword",
    };
    const response = await request(app)
      .post("/auth/login")
      .send(userCredentials);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });

  it("should not login a user with an invalid password", async () => {
    const userCredentials = {
      email: "test@example.com",
      password: "invalidPassword",
    };
    const response = await request(app)
      .post("/auth/login")
      .send(userCredentials);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error");
  });
});
