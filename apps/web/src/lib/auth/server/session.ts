import { cookies } from "next/headers";
import {
  adminAuthApp,
  getCurrentFirebaseUser,
  revokeRefreshTokens,
} from "./auth";

export async function getSession(): Promise<string | undefined> {
  return cookies().get("__session")?.value;
}

export async function createNewSession(idToken: string): Promise<void> {
  const expiresIn = 60 * 60 * 24 * 5 * 1000;

  const sessionCookie = await adminAuthApp.createSessionCookie(idToken, {
    expiresIn,
  });
  cookies().set({
    name: "__session",
    value: sessionCookie,
    maxAge: expiresIn,
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
  });
}

export async function signOutSession(): Promise<void> {
  const { currentUser } = await getCurrentFirebaseUser(await getSession());
  currentUser && (await revokeRefreshTokens(currentUser));
  cookies().delete("__session");
}
