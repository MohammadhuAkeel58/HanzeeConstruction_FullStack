import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAZ3WFzykVT_fwZoCTvI4lnNZZ8PEpkIsA",
  authDomain: "hanzeeconstruction.firebaseapp.com",
  projectId: "hanzeeconstruction",
  storageBucket: "hanzeeconstruction.appspot.com",
  messagingSenderId: "799883492129",
  appId: "1:799883492129:web:f383da0ee44acf0c25dc60",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
