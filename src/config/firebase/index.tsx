import {initializeApp, getApps, getApp} from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyCFa1oirbmpxnEL-UPAAvjl3F0j-UcjAfM',
  authDomain: 'democopymad.firebaseapp.com',
  projectId: 'democopymad',
  storageBucket: 'democopymad.appspot.com',
  messagingSenderId: '636600337962',
  appId: '1:636600337962:web:83220a6f57eba19e9a2553',
};

// Initialize Firebase App (only if no app is already initialized)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
console.log('Firebase App Initialized:', app.name); // Log Firebase App name

// Initialize Firebase Auth (only if not already initialized)
const auth =
  getApps().length === 0
    ? initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      })
    : getAuth(app);
console.log('Firebase Auth Initialized:', auth); // Log Firebase Auth instance

// Initialize Firestore
const db = getFirestore(app);
console.log('Firestore Initialized:', db); // Log Firestore instance

export {app, auth, db};
