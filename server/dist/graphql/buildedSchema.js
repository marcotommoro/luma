"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const fs_1 = __importDefault(require("fs"));
const graphql_1 = require("graphql");
const buffer = fs_1.default.readFileSync(__dirname + "/schema.graphql");
const fileContent = buffer.toString();
exports.schema = (0, graphql_1.buildSchema)(`${fileContent}`);
//# sourceMappingURL=buildedSchema.js.map