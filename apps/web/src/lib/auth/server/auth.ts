// NOTE: Firebase AuthenticationとNext.jsを連携させる方法については以下のサイトを参考にしました
// REF: https://firebase.google.com/codelabs/firebase-nextjs?hl=ja
// REF: https://github.com/firebase/friendlyeats-web

import { Auth, getAuth as getAdminAuth } from "firebase-admin/auth";
import { adminApp } from "./firebase-admin";
import { FirebaseUser } from "../user-type";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { getCustomAuthApp } from "./firebase";

export const adminAuthApp = getAdminAuth(adminApp);

export async function isRevoked(adminAuth: Auth, session: string) {
  const isRevoked = !(await adminAuth
    .verifySessionCookie(session, true)
    .catch((e) => console.error(e.message)));

  return isRevoked;
}

export async function getCurrentFirebaseUser(
  session: string | null = null
): Promise<{
  currentUser: FirebaseUser | null;
}> {
  const noSessionReturn = { currentUser: null };

  if (session == null) return noSessionReturn;

  const adminAuth = getAdminAuth(adminApp);

  // handle revoked tokens
  if (await isRevoked(adminAuth, session)) return noSessionReturn;

  const decodedIdToken = await adminAuth.verifySessionCookie(session);

  return {
    currentUser: {
      uid: decodedIdToken.uid,
      email: decodedIdToken.email,
      picture: decodedIdToken.picture,
    },
  };
}

export async function revokeRefreshTokens(user: FirebaseUser) {
  const auth = getAdminAuth(adminApp);
  return auth.revokeRefreshTokens(user.uid);
}

export async function getIdToken(user: FirebaseUser): Promise<string> {
  const adminAuth = getAdminAuth(adminApp);

  const customToken = await adminAuth.createCustomToken(user.uid);

  const auth = getAuth(getCustomAuthApp(user.uid));
  const cred = await signInWithCustomToken(auth, customToken);
  return cred.user.getIdToken(true);
}
