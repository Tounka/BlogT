// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB6RD5i0JQa2-Bb9ydRj6FljuuZ-9dePrU",
  authDomain: "blogt-bcd9e.firebaseapp.com",
  projectId: "blogt-bcd9e",
  storageBucket: "blogt-bcd9e.appspot.com",
  messagingSenderId: "338956454393",
  appId: "1:338956454393:web:47815c58f8d28659dcd528",
  measurementId: "G-R8MPBHXKB7"
};
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
