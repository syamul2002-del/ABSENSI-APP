import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBe1yZqT-Q873iGQEl2EnDyQtlWUWE6hbQ",
  authDomain: "absensiswa-153b0.firebaseapp.com",
  databaseURL: "https://absensiswa-153b0-default-rtdb.firebaseio.com",
  projectId: "absensiswa-153b0",
  storageBucket: "absensiswa-153b0.appspot.com",
  messagingSenderId: "724682492879",
  appId: "1:724682492879:web:0a0a0a0a0a0a0a0a0a0a0"
};

const app = initializeApp(firebaseConfig);

// 🔥 WAJIB ADA INI
export const auth = getAuth(app);
export const db = getDatabase(app);
