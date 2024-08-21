import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBEwYsJ44GNs7OlF-H47vwV5XJ5ZC2HOjw",
  authDomain: "informationtursino.firebaseapp.com",
  projectId: "informationtursino",
  storageBucket: "informationtursino.appspot.com",
  messagingSenderId: "697930158806",
  appId: "1:697930158806:web:c533db4cfcd4aaf211ef77",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
