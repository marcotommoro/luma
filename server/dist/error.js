"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.ErrorHandler = void 0;
const http_1 = __importDefault(require("http"));
class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.message = message;
        this.name = "ExpressError";
    }
}
exports.ErrorHandler = ErrorHandler;
const handleError = (error, res) => {
    const { statusCode, message } = error;
    const code = statusCode || 500;
    const codeMessage = http_1.default.STATUS_CODES[code];
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
exports.handleError = handleError;
//# sourceMappingURL=error.js.map