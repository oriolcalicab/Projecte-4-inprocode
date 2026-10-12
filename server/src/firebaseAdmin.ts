import { getApps, initializeApp } from "firebase-admin/app";

export function initFirebase() {
  const projectId = process.env.FIREBASE_PROJECT_ID;

  if (!projectId) {
    throw new Error("Falta la variable FIREBASE_PROJECT_ID al fitxer .env");
  }

  if (getApps().length === 0) {
    initializeApp({ projectId });
  }
}