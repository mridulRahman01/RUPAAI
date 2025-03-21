import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration (Replace with your actual Firebase config)
const firebaseConfig = {
  apiKey: "AIzaSyAdTmuMuowy5vtWmKPzL-7zPFHhyJTEQyk",
  authDomain: "kids-app-b112d.firebaseapp.com",
  projectId: "kids-app-b112d",
  storageBucket: "kids-app-b112d.appspot.com",
  messagingSenderId: "522675695301",
  appId: "1:522675695301:web:c968b0c7a16b06ffb8caac",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Export Firebase auth for use in other components
export { auth, googleProvider };
export default app;
