import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyB-CEiOW78Y2uJYgYcN6NBkySgL_TN64oY",
  authDomain: "parkforless-45ee5.firebaseapp.com",
  projectId: "parkforless-45ee5",
  storageBucket: "parkforless-45ee5.appspot.com",
  messagingSenderId: "135578722787",
  appId: "1:135578722787:web:374d9d870e2bab609b00d6"
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();