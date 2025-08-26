

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyXXXX",
  authDomain: "myapp.firebaseapp.com",
  projectId: "myapp",
  storageBucket: "myapp.appspot.com",
  messagingSenderId: "123456",
  appId: "1:123456:web:abcdef"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default app;

