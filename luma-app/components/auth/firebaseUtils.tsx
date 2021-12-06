import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "./firebase.config";

export const firebaseSignupEmailPassword = async (
  email: string,
  passwd: string
): Promise<string | null> => {
  try {
    await createUserWithEmailAndPassword(auth, email, passwd);
    console.log("Minchia figa");
  } catch (error: any) {
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
    await signInWithEmailAndPassword(auth, email, passwd);
  } catch (error: any) {
    if (error.code === "auth/user-not-found") return "Utente non trovato";
    return "Errore di autenticazione";
  }
  return;
};
