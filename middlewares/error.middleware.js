import { isCelebrateError } from "celebrate";
import logger from "../logger.js";

export const ErrorHandler = class extends Error {
  constructor(statusCode, errorCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = message;
  }
};

export const badRequestError = (message) => {
  return new ErrorHandler(400, "InvalidData", message);
};

export const dbConflictError = (message) => {
  return new ErrorHandler(409, "InvalidData", message);
};

export const authenticationError = (message) => {
  return new ErrorHandler(401, "InvalidToken", message);
};

export const notAcceptableError = (message) => {
  return new ErrorHandler(406, "Not Acceptable", message);
};

export const unknownResourceError = (message) => {
  return new ErrorHandler(404, "UnknownResource", message);
};

export const notImplementedError = (message) => {
  return new ErrorHandler(400, "NotImplementedError", message);
};

export const handleKnownExceptions = (error, response) => {
  logger.error({ ...error, message: error.message });
  const { statusCode, errorCode, message } = error;
  response
    .status(statusCode)
    .json({ success: false, errorMessage: `${errorCode} | ${message}` })
    .end();
};

export const handleUnknownExceptions = (error, response) => {
  logger.error({ ...error, message: error.message });
  return response
    .status(500)
    .json({ errorMessage: `${error.name} | ${error.message}` })
    .end();
};

export const handleError = (error, response) => {
  if (isCelebrateError(error)) {
    const message = formatCelebrateErrors(error);
    return response.status(400).json({ success: false, errorMessage: message });
  }

  if (error instanceof ErrorHandler) {
    handleKnownExceptions(error, response);
  } else {
    handleUnknownExceptions(error, response);
  }
};

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
