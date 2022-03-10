import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { registerUserRole } from "../api/register";
import { auth, db } from "./firebase.config";

export const firebaseSignupEmailPassword = async (
  email: string,
  passwd: string,
  role: string
): Promise<FirebaseError | null> => {
  try {
    await createUserWithEmailAndPassword(auth, email, passwd);
    registerUserRole(role);
  } catch (error: FirebaseError | any) {
    console.log(error);
    return error;
  }
  return null;
};

export const firebaseLoginEmailPassword = async (
  email: string,
  passwd: string
) => {
  try {
    await signInWithEmailAndPassword(getAuth(), email, passwd);
  } catch (error: any) {
    if (error.code === "auth/user-not-found") return "Utente non trovato";
    return "Errore di autenticazione";
  }
};

export const listenerDocument = async (id: string) => {
  const unsub = onSnapshot(doc(db, "emergency", id), (d) => {
    console.log(d.data());
  });
};
