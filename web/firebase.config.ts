// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyCfMK39e0TKMz-njpLLLdOGqhUn0P8q0WI",
  authDomain: "luma-iot.firebaseapp.com",
  projectId: "luma-iot",
  storageBucket: "luma-iot.appspot.com",
  messagingSenderId: "253651337975",
  appId: "1:253651337975:web:d77041b82c2335642189f2",
  measurementId: "G-EDHQL1QSVJ",
};

// Initialize Firebase

export const initFirebase = () => {
  initializeApp(firebaseConfig);
};
