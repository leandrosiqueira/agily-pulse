import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC_V-lnLHb6oO3KiAbL3ysrX0g10eYxIfs",
  authDomain: "agilypulse.firebaseapp.com",
  projectId: "agilypulse",
  storageBucket: "agilypulse.firebasestorage.app",
  messagingSenderId: "12949931790",
  appId: "1:12949931790:web:81e192754e6ec4f82cf95f",
  measurementId: "G-3PXG24N7J7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
