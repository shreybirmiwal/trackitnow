import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDIWekN2FbpnGigKU9JVekPlrPfO-a6OVE",
  authDomain: "locker-stock-management.firebaseapp.com",
  projectId: "locker-stock-management",
  storageBucket: "locker-stock-management.appspot.com",
  messagingSenderId: "391715081944",
  appId: "1:391715081944:web:9e85bd15e4f4a6d73b11ad"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)  
export const db = getFirestore(app);