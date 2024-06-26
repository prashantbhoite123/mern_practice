// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-parctice.firebaseapp.com",
  projectId: "mern-auth-parctice",
  storageBucket: "mern-auth-parctice.appspot.com",
  messagingSenderId: "396193933862",
  appId: "1:396193933862:web:f933a6172f7f5641c114e7",
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
