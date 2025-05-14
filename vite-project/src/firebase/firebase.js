// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB0Ht_P-wCcEBifZgAUyWe-AOfLBpZFJFQ",
  authDomain: "session15-3a968.firebaseapp.com",
  projectId: "session15-3a968",
  storageBucket: "session15-3a968.firebasestorage.app",
  messagingSenderId: "576232824094",
  appId: "1:576232824094:web:13756fd3497f6f3189fd0f",
  measurementId: "G-77VQWD53XY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);