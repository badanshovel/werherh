// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB113tcXfhdLHa2ybdG8Qf8RhIhU7JGqWs",
  authDomain: "sdfsdfads-2af3e.firebaseapp.com",
  projectId: "sdfsdfads-2af3e",
  storageBucket: "sdfsdfads-2af3e.firebasestorage.app",
  messagingSenderId: "1096150990438",
  appId: "1:1096150990438:web:9ea6c6969d10a973a3f7a7",
  measurementId: "G-F0T3HPZPYK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };