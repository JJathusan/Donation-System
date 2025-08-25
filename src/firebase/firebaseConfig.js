

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0BlNPTbOfHCIuzeIlcYqJewu_pr6ZCZo",
  authDomain: "donation-system-a7eec.firebaseapp.com",
  projectId: "donation-system-a7eec",
  storageBucket: "donation-system-a7eec.firebasestorage.app",
  messagingSenderId: "745255217966",
  appId: "1:745255217966:web:40827fd5f9ec77e6fee8bf",
  measurementId: "G-GC6Q9B1PYP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;
