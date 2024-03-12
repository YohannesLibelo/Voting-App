// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyACfqYVliEv9gVBWRY7otJRuj3HE8xq0Rg",
  authDomain: "vote-6d365.firebaseapp.com",
  projectId: "vote-6d365",
  storageBucket: "vote-6d365.appspot.com",
  messagingSenderId: "631893039260",
  appId: "1:631893039260:web:418b909f40e9c04c473559",
  measurementId: "G-W879Q9RMXV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);