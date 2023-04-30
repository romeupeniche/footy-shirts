import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = JSON.parse(import.meta.env.VITE_FIREBASE_CONFIG);

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db };
