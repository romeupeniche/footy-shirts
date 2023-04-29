import { initializeApp } from "firebase/app";

const firebaseConfig = process.env.REACT_APP_FIREBASE_CONFIG;

const app = initializeApp(firebaseConfig);

export default app;
