"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.notImplementedError = exports.unknownResourceError = exports.notAcceptableError = exports.authenticationError = exports.dbConflictError = exports.badRequestError = exports.ErrorHandler = void 0;
const celebrate_1 = require("celebrate");
const logger_1 = __importDefault(require("../logger"));
class ErrorHandler extends Error {
    constructor(statusCode, errorCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
    }
}
exports.ErrorHandler = ErrorHandler;
const badRequestError = (message) => {
    return new ErrorHandler(400, "InvalidData", message);
};
exports.badRequestError = badRequestError;
const dbConflictError = (message) => {
    return new ErrorHandler(409, "InvalidData", message);
};
exports.dbConflictError = dbConflictError;
const authenticationError = (message) => {
    return new ErrorHandler(401, "InvalidToken", message);
};
exports.authenticationError = authenticationError;
const notAcceptableError = (message) => {
    return new ErrorHandler(406, "Not Acceptable", message);
};
exports.notAcceptableError = notAcceptableError;
const unknownResourceError = (message) => {
    return new ErrorHandler(404, "UnknownResource", message);
};
exports.unknownResourceError = unknownResourceError;
const notImplementedError = (message) => {
    return new ErrorHandler(400, "NotImplementedError", message);
};
exports.notImplementedError = notImplementedError;
const handleKnownExceptions = (error, response) => {
    logger_1.default.error(Object.assign(Object.assign({}, error), { message: error.message }));
    const { statusCode, errorCode, message } = error;
    return response
        .status(statusCode)
        .json({ success: false, errorMessage: `${errorCode} | ${message}` })
        .end();
};
const handleUnknownExceptions = (error, response) => {
    logger_1.default.error(Object.assign(Object.assign({}, error), { message: error.message }));
    return response
        .status(500)
        .json({ errorMessage: `${error.name} | ${error.message}` })
        .end();
};
const handleError = (error, response) => {
    if ((0, celebrate_1.isCelebrateError)(error)) {
        const message = formatCelebrateErrors(error);
        return response.status(400).json({ success: false, errorMessage: message });
    }
    if (error instanceof ErrorHandler) {
        handleKnownExceptions(error, response);
    }
    else {
        handleUnknownExceptions(error, response);
    }
};
exports.handleError = handleError;
const formatCelebrateErrors = (error) => {
    let message = "";
    error.details.forEach((validationError) => {
        if (message) {
            message += "\n";
        }
        message += validationError.message;
    });
    return message;
};
//# sourceMappingURL=error.middleware.js.map