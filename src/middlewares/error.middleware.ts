import { isCelebrateError } from "celebrate";
import { Request, Response } from "express";
import logger from "../logger";

export class ErrorHandler extends Error {
  statusCode: number;
  errorCode: string;

  constructor(statusCode: number, errorCode: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.errorCode = errorCode;
    this.message = message;
  }
}

export const badRequestError = (message: string): ErrorHandler => {
  return new ErrorHandler(400, "InvalidData", message);
};

export const dbConflictError = (message: string): ErrorHandler => {
  return new ErrorHandler(409, "InvalidData", message);
};

export const authenticationError = (message: string): ErrorHandler => {
  return new ErrorHandler(401, "InvalidToken", message);
};

export const notAcceptableError = (message: string): ErrorHandler => {
  return new ErrorHandler(406, "Not Acceptable", message);
};

export const unknownResourceError = (message: string): ErrorHandler => {
  return new ErrorHandler(404, "UnknownResource", message);
};

export const notImplementedError = (message: string): ErrorHandler => {
  return new ErrorHandler(400, "NotImplementedError", message);
};

const handleKnownExceptions = (
  error: ErrorHandler,
  response: Response
): Response => {
  logger.error({ ...error, message: error.message });
  const { statusCode, errorCode, message } = error;
  return response
    .status(statusCode)
    .json({ success: false, errorMessage: `${errorCode} | ${message}` })
    .end();
};
const handleUnknownExceptions = (error: any, response: Response): Response => {
  logger.error({ ...error, message: error.message });
  return response
    .status(500)
    .json({ errorMessage: `${error.name} | ${error.message}` })
    .end();
};

export const handleError = (error: any, response: Response): any => {
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

const formatCelebrateErrors = (error: any): string => {
  let message = "";
  error.details.forEach((validationError: any) => {
    if (message) {
      message += "\n";
    }
    message += validationError.message;
  });
  return message;
};
