"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const auth_1 = require("./auth");
const error_1 = require("./error");
const buildedSchema_1 = require("./graphql/buildedSchema");
const resolvers_1 = require("./graphql/resolvers");
const routes_1 = require("./routes");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use("/auth", auth_1.checkAuth, routes_1.authRouter);
app.use("/graphql", (0, express_graphql_1.graphqlHTTP)({ graphiql: true, schema: buildedSchema_1.schema, rootValue: resolvers_1.root }));
// Handle route not found error.
app.use((req, res, next) => {
    next(new error_1.ErrorHandler(404, "Route not found"));
});
// Handle every other app error.
app.use((error, req, res, next) => {
    (0, error_1.handleError)(error, res);
});
app.listen(8080);
console.log("Listen fuck on 8080\n");
//# sourceMappingURL=index.js.map