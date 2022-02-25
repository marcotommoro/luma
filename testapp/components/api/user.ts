import { getAuth } from "@firebase/auth";
import * as Location from "expo-location";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  increment,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";
import { auth, db } from "../auth/firebase.config";
import { readBluethootValue } from "../bluethoot";

export const getUserInfo = async () => {
  try {
    if (!auth.currentUser) return;

    const snap = await getDoc(doc(db, "users", auth.currentUser.uid));
    if (!snap.exists()) return {};

    return snap.data();
  } catch (e) {
    console.log("error", e);
  }
};

export const setHelp = async (): Promise<string> => {
  //TODO: get location
  let location = { latitude: 1.24534645, longitude: 2.2345364 };
  try {
    location = (await Location.getCurrentPositionAsync()).coords;
  } catch (error) {
    console.log("ciao", error);
  }

  console.log(location);

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
    uidSupporter: getAuth().currentUser.uid,
  });
};

export const setHelpingNotComing = async (docId: string) => {
  updateDoc(doc(db, "emergency", docId), {
    supportComing: false,
  });
};
let lastLoad = moment();
export const writeData = async (heart: number) => {
  if (heart > 200 || heart < 20) return;

  if (moment().diff(lastLoad, "second") < 30) return;

  addDoc(collection(db, "data"), {
    heart,
    sp02: Math.floor(Math.random() * 40) + 61,
    timestamp: new Date(),
    uid: getAuth().currentUser?.uid,
  });
};

let isSendingData = false;

const sleep = async (time: number) =>
  new Promise((resolve, _) =>
    setTimeout(() => {
      resolve(null);
    }, time)
  );

export const startSendingDataLive = async (heart: number) => {
  setTimeout(() => {
    stopSendingDataLive();
  }, 20000);

  console.log("ciao", isSendingData);
  if (isSendingData) return;
  isSendingData = true;
  while (isSendingData) {
    // if (Math.random() * 200 !== 0) return;
    const uid = getAuth().currentUser?.uid;
    if (!uid) return;
    let v = -1;
    try {
      v = (await readBluethootValue())[0];
    } catch (error) {}

    setDoc(doc(db, "live", uid), {
      heart: v,
      sp02: Math.floor(Math.random() * 40) + 61,
    });
    await sleep(2000);
  }
};

export const stopSendingDataLive = () => {
  isSendingData = false;
  updateDoc(doc(db, "users", getAuth().currentUser?.uid), {
    isLive: false,
  });
  deleteDoc(doc(db, "live", getAuth().currentUser.uid));
};

export const donateLuma = (uidSupporter: string, qty: number) => {
  updateDoc(doc(db, "users", uidSupporter), {
    quantity_luma: increment(qty),
  });
  updateDoc(doc(db, "users", getAuth().currentUser.uid), {
    quantity_luma: increment(-qty),
  });
};
