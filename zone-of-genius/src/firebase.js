// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAlYpWWpFKQc8onTdEO2P11P-h99MMpoZE",
  authDomain: "zone-of-genius-85cb4.firebaseapp.com",
  projectId: "zone-of-genius-85cb4",
  storageBucket: "zone-of-genius-85cb4.appspot.com",
  messagingSenderId: "941608242876",
  appId: "1:941608242876:web:e058fa8b0315b567620ab9",
  measurementId: "G-0HGMYN6RDV"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };