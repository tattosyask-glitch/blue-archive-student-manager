import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC5PTcxtCji2IZPQiN5C1HSaUb_tVsOIGY",
  authDomain: "ba-student-manager.firebaseapp.com",
  projectId: "ba-student-manager",
  storageBucket: "ba-student-manager.firebasestorage.app",
  messagingSenderId: "768597015895",
  appId: "1:768597015895:web:71e1e62368d45489a01212",
  measurementId: "G-6VZMGJKPC3"
};

const app = initializeApp(firebaseConfig);

// アプリ全体で使えるようにエクスポートします
export const auth = getAuth(app);
export const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

// Googleログイン用の関数
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);
// ログアウト用の関数
export const logout = () => signOut(auth);
