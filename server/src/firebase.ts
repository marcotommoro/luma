import admin from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { config } from "./credentials/firebase-config.js";

initializeApp({
  credential: admin.credential.cert(config),
});

export const fs = getFirestore();
export const auth = getAuth();
