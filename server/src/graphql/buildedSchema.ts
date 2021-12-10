import fs from "fs";
import { buildSchema } from "graphql";

const buffer = fs.readFileSync(__dirname + "/schema.graphql");

const fileContent = buffer.toString();

export const schema = buildSchema(`${fileContent}`);
