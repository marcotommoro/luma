import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../auth/firebase.config";

export const registerUserRole = async (role: string) => {
  if (!auth.currentUser) return;

  await setDoc(doc(db, "users", auth.currentUser.uid), {
    role,
    quantity_luma: 0,
  });
};
