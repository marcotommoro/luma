import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import expressWs from "express-ws";
import { authMiddleware } from "./auth";
import { ErrorHandler, handleError } from "./error";
import { userRouter } from "./routers/routes";
dotenv.config();

const baseApp = express();

const instance = expressWs(baseApp);
const { app } = instance;

app.use(cors());
// app.use("/auth", checkAuth, authRouter);
app.use(express.json());
app.use(authMiddleware);
app.use("/user", userRouter);

// Handle route not found error.
app.use((req, res, next) => {
  next(new ErrorHandler(404, "Route not found"));
});

// Handle every other app error.
app.use(
  (
    error: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(error);
    handleError(error, res);
  }
);

app.ws("/need-help", (ws, req) => {
  ws.on("message", (msg) => {
    console.log(msg);
  });
  console.log("socket", "inizializzato");
});

app.listen(8080);

console.log("Listen fuck on 8080\n");
