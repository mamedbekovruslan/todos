// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD3iAyVW_RhaeUiUnVGCblNeAAOiLwkij8",
  authDomain: "todos-99bd8.firebaseapp.com",
  databaseURL:
    "https://todos-99bd8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "todos-99bd8",
  storageBucket: "todos-99bd8.appspot.com",
  messagingSenderId: "275384342190",
  appId: "1:275384342190:web:567e84f4096cc7917bbf3f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

export { database };
