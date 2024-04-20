// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-sla.firebaseapp.com",
  projectId: "mern-sla",
  storageBucket: "mern-sla.appspot.com",
  messagingSenderId: "1070719318665",
  appId: "1:1070719318665:web:e28902e092d11a135ce458"
};
  
// Initialize Firebase
export const app = initializeApp(firebaseConfig);