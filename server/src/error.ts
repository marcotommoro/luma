import express from "express";
import http from "http";

export class ErrorHandler extends Error {
  statusCode: number;
  constructor(statusCode: number, message: string) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.name = "ExpressError";
  }
}

export const handleError = (error: any, res: express.Response) => {
  const { statusCode, message } = error;
  const code = statusCode || 500;
  const codeMessage = http.STATUS_CODES[code];

  const originatedFrom = error.stack
    .split("\n")[1]
    .trim()
    .replace("file://", "");

  // Put the error message into response locals, for logger.
  res.locals.errorMessage = `${codeMessage}. ${message} [${originatedFrom}]`;

  res.status(code).json({
    status: "error",
    code,
    codeMessage,
    message,
  });
};
