import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
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

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
    })
    .catch((e) => console.log("errore e", e));
};

export const setHelp = async () => {
  //TODO: get location
  const location = { latitude: 1.24534645, longitude: 2.2345364 };
  const doc = await addDoc(collection(db, "emergency"), {
    uid: auth.currentUser?.uid,
    location,
    created: serverTimestamp(),
    supportComing: false,
  });
  return doc.id;
};

export const listenerDocument = async (id: string) => {
  const unsub = onSnapshot(doc(db, "emergency", id), (d) => {
    console.log(d.data());
  });
};
