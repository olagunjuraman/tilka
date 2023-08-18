"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stream = void 0;
const moment_1 = __importDefault(require("moment"));
const winston_1 = require("winston");
const { combine, timestamp, colorize, printf } = winston_1.format;
const customFormat = printf(({ level, message, timestamp, stack = "" }) => {
    const ts = (0, moment_1.default)(timestamp).local().format("HH:mm:ss.SSS");
    return `${ts} ${level}: ${message} ${stack}`;
});
const logger = (0, winston_1.createLogger)({
    level: "debug",
    format: combine(colorize(), timestamp(), customFormat),
    transports: [
        new winston_1.transports.Console(),
        new winston_1.transports.File({ filename: "./logs/error.log", level: "error" }),
        new winston_1.transports.File({
            filename: "./logs/app.log",
            level: "info",
            handleExceptions: true,
            maxsize: 5242880,
            maxFiles: 5,
        }),
    ],
});
exports.stream = {
    write: (message) => {
        logger.info(message);
    },
};
exports.default = logger;
//# sourceMappingURL=logger.js.map