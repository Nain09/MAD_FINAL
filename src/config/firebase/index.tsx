import {initializeApp, getApps} from 'firebase/app';
import {
  initializeAuth,
  getAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCFa1oirbmpxnEL-UPAAvjl3F0j-UcjAfM',
  authDomain: 'democopymad.firebaseapp.com',
  projectId: 'democopymad',
  storageBucket: 'democopymad.firebasestorage.app',
  messagingSenderId: '636600337962',
  appId: '1:636600337962:web:83220a6f57eba19e9a2553',
};

// Initialize Firebase App (only if no app is already initialized)
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
console.log('Firebase App Initialized:', app.name); // Log Firebase App name

// Initialize Firebase Auth (only if no auth instance exists)
const auth =
  getAuth(app) ||
  initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
console.log('Firebase Auth Initialized:', auth); // Log Firebase Auth instance

export {app, auth};
