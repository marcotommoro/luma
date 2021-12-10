import express from "express";
import { auth } from "./firebase";

export const checkAuth = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { tokenId } = req.body;
    const { uid } = await auth.verifyIdToken(tokenId);
    console.log(uid);

    res.locals.uid = uid;
    next();
  } catch (error) {
    next(error);
  }
};
