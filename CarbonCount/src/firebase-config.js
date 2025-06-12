// src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7O7fnqQwMb_hr7B5VfOZeYo735WD9FTo",
  authDomain: "carboncount-84329.firebaseapp.com",
  projectId: "carboncount-84329",
  storageBucket: "carboncount-84329.firebasestorage.app",
  messagingSenderId: "607479542453",
  appId: "1:607479542453:web:74de28342cc4580886c4fc",
  measurementId: "G-V87HT78N6P"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
