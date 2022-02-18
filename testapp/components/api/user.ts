import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { auth, db } from "../auth/firebase.config";

export const getUserInfo = async () => {
  try {
    if (!auth.currentUser) return;

    const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (snap.exists()) {
      console.log("Document data:", snap.data());
    } else {
      console.log("No such document!");
    }

    return snap.data();
  } catch (e) {
    console.log("error", e);
  }
};

export const setHelp = async (): Promise<string> => {
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

export const removeHelp = async (docId: string) => {
  deleteDoc(doc(db, "emergency", docId));
};

export const queryEmergency = () =>
  query(collection(db, "emergency"), where("supportComing", "==", false));

export const getEmergency = async (): Promise<object> => {
  const snap = await getDocs(queryEmergency());
  let obj = {};
  snap.docs.forEach((d) => (obj = { ...obj, [d.id]: d.data() }));
  return obj;
};

export const setHelpingComing = async (docId: string) => {
  updateDoc(doc(db, "emergency", docId), {
    supportComing: true,
  });
};

export const setHelpingNotComing = async (docId: string) => {
  updateDoc(doc(db, "emergency", docId), {
    supportComing: false,
  });
};
