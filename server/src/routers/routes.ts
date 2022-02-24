import express, { Router } from "express";
import { fs } from "../firebase";

export const userRouter: express.Router = Router();

userRouter.post(
  "/fetch-value",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { uid }: { uid?: string } = res.locals;

      console.log("uid", uid);

      const doc = await fs
        .collection("users")
        .doc("Rhy29GIf25DP5IKkbI0L")
        .get();
      console.log(doc);
      if (!doc.exists) throw new Error("Document doesn't exists.");
      const data = doc.data();
      console.log(data);
      res.send(data);
    } catch (e) {
      const error = e as Error;
      next(error);
    }
  }
);

userRouter.post(
  "/register-role",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { uid } = res.locals;
      const { role } = req.body;

      await fs.collection("users").doc(uid).set({ role, quantity_luma: 0 });
      fs.collection("users").doc();
      res.send("OK!");
    } catch (e) {
      const error = e as Error;
      next(error);
    }
  }
);

userRouter.post(
  "/get-user-info",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { uid } = res.locals;
      const doc = await fs.collection("users").doc(uid).get();

      if (!doc.exists) {
        throw new Error("Document doesn't exists.");
      }

      res.send(doc.data());
    } catch (e) {
      const error = e as Error;
      next(error);
    }
  }
);
