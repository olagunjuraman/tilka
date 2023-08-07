import moment from "moment";
import { createLogger, format, transports } from "winston";

const { combine, timestamp, colorize, printf } = format;

const customFormat = printf(({ level, message, timestamp, stack = "" }) => {
  const ts = moment(timestamp).local().format("HH:mm:ss.SSS");
  return `${ts} ${level}: ${message} ${stack}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(colorize(), timestamp(), customFormat),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "./logs/error.log", level: "error" }),
    new transports.File({
      filename: "./logs/app.log",
      level: "info",
      handleExceptions: true,
      json: true,
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

export const stream = {
  write: (message) => {
    logger.info(message);
  },
};

export default logger;
