// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { Firestore, initializeFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCfMK39e0TKMz-njpLLLdOGqhUn0P8q0WI",
  authDomain: "luma-iot.firebaseapp.com",
  projectId: "luma-iot",
  storageBucket: "luma-iot.appspot.com",
  messagingSenderId: "253651337975",
  appId: "1:253651337975:web:eccb1b0a192962472189f2",
  measurementId: "G-VVSCJ8DNHT",
};

// Initialize Firebase
const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth: Auth = getAuth(app);
export const db: Firestore = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
