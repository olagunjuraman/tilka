import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import auth from "./routes/auth.route.js";
import users from "./routes/user.route.js";
import {
  handleError,
  unknownResourceError,
} from "./middlewares/error.middleware.js";
import mongoSanitize from "express-mongo-sanitize";
import helmet from "helmet";
import xss from "xss-clean";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import cors from "cors";
import logger from "./logger.js";

dotenv.config();

const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json()); // Body parser
app.use(mongoSanitize()); // Sanitize data
app.use(helmet()); // Set security headers
app.use(xss()); // Prevent XSS attacks

const limiter = rateLimit({
  // Rate limiting
  windowMs: 10 * 60 * 1000, // 10 mins
  max: 100,
});
app.use(limiter);

app.use(hpp()); // Prevent http param pollution
app.use(cors()); // Enable CORS

app.get("/", (req, res) => {
  res.json({
    success: true,
    data: "Server is active",
  });
});

app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);

app.use(function (req, res, next) {
  logger.error(`Route not found: ${req.path}`);
  throw unknownResourceError(
    `The route you are trying to reach (${req.path}) does not exist`
  );
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

const server = app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT} in ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.error(err);
  logger.error(`${err.name}, ${err.message}`);
  server.close(() => {
    process.exit(1);
  });
});
