import { ServiceAccount, getApps, initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

export function initializeFirebaseAdmin() {
  const cert: ServiceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  };
  if (getApps().length === 0) {
    initializeApp({
      credential: credential.cert(cert),
    });
  }
}
