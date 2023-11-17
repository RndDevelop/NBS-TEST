// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAunhug7H_uzfeewktQyKtKrxRK0DtRlpA",
  authDomain: "tsm-test-680ea.firebaseapp.com",
  projectId: "tsm-test-680ea",
  storageBucket: "tsm-test-680ea.appspot.com",
  messagingSenderId: "883871412478",
  appId: "1:883871412478:web:c02623c3d6816350d9f5af",
  measurementId: "G-Y012SQ3V4E",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// export const auth = getAnalytics(app);
