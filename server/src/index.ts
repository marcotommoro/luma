import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { config } from "./credentials/firebase-config.js";

dotenv.config();

const app = express();

initializeApp({
  credential: admin.credential.cert(config),
});
const fs = getFirestore();
const auth = getAuth();

app.use(cors());

app.get("/", async (req, res) => {
  res.set("Content-Type", "application/json");
  res.set("Access-Control-Allow-Origin", "*");

  res.send("fuck");
});

// const mintTo = () => {};

// app.post(
//   "/auth/mint/",
//   (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     // const {} = req.body;
//   }
// );

app.listen(3000);
console.log("Listen fuck on 3000\n");
