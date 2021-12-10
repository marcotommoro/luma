import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import { checkAuth } from "./auth";
import { ErrorHandler, handleError } from "./error";
import { schema } from "./graphql/buildedSchema";
import { root } from "./graphql/resolvers";
import { authRouter } from "./routes";

dotenv.config();

const app = express();

app.use(cors());
app.use("/auth", checkAuth, authRouter);

app.use("/graphql", graphqlHTTP({ graphiql: true, schema, rootValue: root }));

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
    handleError(error, res);
  }
);

app.listen(8080);

console.log("Listen fuck on 8080\n");
