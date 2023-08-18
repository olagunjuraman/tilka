import app from "./app";
import logger from "./logger";

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`The server is listening on ${PORT} in ${process.env.NODE_ENV}`);
});

process.on("unhandledRejection", (err: any) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...");
  logger.error(`Cause: ${err.name}, ${err.message}`);
  logger.error(err.stack);
  server.close(() => {
    process.exit(1);
  });
});

process.on("uncaughtException", (err: any) => {
  logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  logger.error(`Cause: ${err.name}, ${err.message}`);
  logger.error(err.stack);
  server.close(() => {
    process.exit(1);
  });
});

