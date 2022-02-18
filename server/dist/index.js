"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_ws_1 = __importDefault(require("express-ws"));
const auth_1 = require("./auth");
const error_1 = require("./error");
const routes_1 = require("./routers/routes");
dotenv_1.default.config();
const baseApp = (0, express_1.default)();
const instance = (0, express_ws_1.default)(baseApp);
const { app } = instance;
app.use((0, cors_1.default)());
// app.use("/auth", checkAuth, authRouter);
app.use(express_1.default.json());
app.use(auth_1.authMiddleware);
app.use("/user", routes_1.userRouter);
// Handle route not found error.
app.use((req, res, next) => {
    next(new error_1.ErrorHandler(404, "Route not found"));
});
// Handle every other app error.
app.use((error, req, res, next) => {
    console.log(error);
    (0, error_1.handleError)(error, res);
});
app.ws("/need-help", (ws, req) => {
    ws.on("message", (msg) => {
        console.log(msg);
    });
    console.log("socket", "inizializzato");
});
app.listen(8080);
console.log("Listen fuck on 8080\n");
//# sourceMappingURL=index.js.map