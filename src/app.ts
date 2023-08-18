import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import auth from "./routes/auth.route";
import books from "./routes/book.route";

import {
  handleError,
  unknownResourceError,
} from "./middlewares/error.middleware";
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import cors from "cors";
import logger from "./logger";

dotenv.config();

const app: Application = express();

app.use(express.json());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

app.use(hpp());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    data: "Server is active",
  });
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/books", books);

app.use((req: Request, res: Response, next: NextFunction) => {
  logger.error(`Route not found: ${req.path}`);
  throw unknownResourceError(
    `The route you are trying to reach (${req.path}) does not exist`
  );
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  handleError(err, res);
});

export default app;
