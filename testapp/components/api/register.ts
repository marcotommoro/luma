import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../auth/firebase.config";

export const registerUserRole = async (role: string) => {
  console.log("ROLE", role);

  if (!auth.currentUser) return;

  await setDoc(doc(db, "users", auth.currentUser.uid), {
    role,
    quantity_luma: 0,
  });
  console.log("tutto ok");
};
