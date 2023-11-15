import type { ServiceAccount } from "firebase-admin";
import { initializeApp, getApps, cert } from "firebase-admin/app";

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

export const adminApp =
  getApps()?.[0] ??
  initializeApp({
    credential: cert(serviceAccount),
  });
