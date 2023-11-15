"use client";
import {
  GoogleAuthProvider,
  signInWithPopup,
  getAuth,
  // connectAuthEmulator,
} from "firebase/auth";
import { firebaseApp } from "./firebase";

export const auth = getAuth(firebaseApp);

// NOTE: エミュレータがカスタムトークンを使った認証に対応していないため使わない
// if (process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST) {
//   connectAuthEmulator(
//     auth,
//     process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_HOST
//   );
// }

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();

  try {
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error("Error signing in with Google", error);
  }
}
