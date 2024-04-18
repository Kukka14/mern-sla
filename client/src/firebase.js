// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-sla-1635a.firebaseapp.com",
  projectId: "mern-sla-1635a",
  storageBucket: "mern-sla-1635a.appspot.com",
  messagingSenderId: "434893106006",
  appId: "1:434893106006:web:24d12d5880e8699dd704f7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);