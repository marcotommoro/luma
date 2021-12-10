import express, { Router } from "express";
import { fs } from "./firebase";

export const authRouter: express.Router = Router();

authRouter.post(
  "/fetch-value",
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    try {
      const { uid }: { uid?: string } = res.locals;

      const doc = await fs.doc(uid).get();
      const { lumaValue }: { lumaValue?: number } = doc.data();

      res.send({ lumaValue });
    } catch (e) {
      const error = e as Error;
      next(error);
    }
  }
);

// authRouter.post(
//   "/send-help-signal",
//   async (
//     req: express.Request,
//     res: express.Response,
//     next: express.NextFunction
//   ) => {}
// );
