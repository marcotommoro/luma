import express from "express";
import { auth } from "./firebase";

export const authMiddleware = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log(req.headers);
  try {
    const tokenId = req.headers.authorization;

    const { uid } = await auth.verifyIdToken(tokenId);
    console.log(uid);

    res.locals.uid = uid;

    next();
  } catch (error) {
    next(error);
  }
};
