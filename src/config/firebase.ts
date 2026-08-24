import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAnalytics, isSupported, Analytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCCaLANXiRti6e5Ja4Mn9baMVNMaAYlKrY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mobiles-wholesale.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mobiles-wholesale",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mobiles-wholesale.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "571446181017",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:571446181017:web:74439084f10fda63030c08",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-MCMTJ31FN6"
};

// Initialize Firebase (prevent re-initialization if already initialized)
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Safe Analytics initialization
export let analytics: Analytics | null = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  }).catch((err) => {
    console.warn('Firebase Analytics not supported in this environment:', err);
  });
}
