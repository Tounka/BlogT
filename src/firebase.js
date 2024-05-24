// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB6RD5i0JQa2-Bb9ydRj6FljuuZ-9dePrU",
  authDomain: "blogt-bcd9e.firebaseapp.com",
  projectId: "blogt-bcd9e",
  storageBucket: "blogt-bcd9e.appspot.com",
  messagingSenderId: "338956454393",
  appId: "1:338956454393:web:47815c58f8d28659dcd528",
  measurementId: "G-R8MPBHXKB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

// Initialize Firebase Analytics (optional)
const analytics = getAnalytics(app);
