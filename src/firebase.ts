// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCbW0QS0q80pipnOf0936Q1-gKSTQVPsOI",
  authDomain: "twitter-clone-13a2b.firebaseapp.com",
  projectId: "twitter-clone-13a2b",
  storageBucket: "twitter-clone-13a2b.appspot.com",
  messagingSenderId: "534563905852",
  appId: "1:534563905852:web:30fe12e73f8865db683e39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app)

export const db = getFirestore(app)