// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";            // <-- Import Auth
import { getFirestore } from "firebase/firestore";   // Optional: Firestore
import { getStorage } from "firebase/storage";       // Optional: Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyApAqPD8izPNRnYCR04F8A73PcWtcScKq4",
  authDomain: "mitti-arts.firebaseapp.com",
  projectId: "mitti-arts",
  storageBucket: "mitti-arts.firebasestorage.app",
  messagingSenderId: "210246065218",
  appId: "1:210246065218:web:f12fd699aaae28466021db",
  measurementId: "G-NXE5M1RYHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// ✅ Initialize required Firebase services
const auth = getAuth(app);           // For Authentication
const db = getFirestore(app);        // For Firestore (optional)
const storage = getStorage(app);

export const googleProvider = new GoogleAuthProvider();

export { auth, db, storage };
