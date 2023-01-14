import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDCuiG5lLgqhBZrmn4gJgA6ULGCiV4n8_g",
  authDomain: "mrp-project-cbee3.firebaseapp.com",
  projectId: "mrp-project-cbee3",
  storageBucket: "mrp-project-cbee3.appspot.com",
  messagingSenderId: "319350992561",
  appId: "1:319350992561:web:cc873bb3961a5c7c9f7c90",
  databaseURL: "https://mrp-project-cbee3-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);

export default app;
