// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config =
    typeof window !== 'undefined' && window.VUE_APP_CONFIG
        ? window.VUE_APP_CONFIG
        : {
              FIREBASE_API_KEY: process.env.VUE_APP_FIREBASE_API_KEY,
              FIREBASE_AUTH_DOMAIN: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
              FIREBASE_PROJECT_ID: process.env.VUE_APP_FIREBASE_PROJECT_ID,
              FIREBASE_STORAGE_BUCKET: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
              FIREBASE_MESSAGING_SENDER_ID:
                process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
              FIREBASE_APP_ID: process.env.VUE_APP_FIREBASE_APP_ID,
              FIREBASE_MEASUREMENT_ID:
                process.env.VUE_APP_FIREBASE_MEASUREMENT_ID,
              FIREBASE_DATABASE_URL: process.env.VUE_APP_FIREBASE_DATABASE_URL
          };

const firebaseConfig = {
    apiKey: config.FIREBASE_API_KEY,
    authDomain: config.FIREBASE_AUTH_DOMAIN,
    projectId: config.FIREBASE_PROJECT_ID,
    storageBucket: config.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID,
    appId: config.FIREBASE_APP_ID,
    measurementId: config.FIREBASE_MEASUREMENT_ID,
    databaseURL: config.FIREBASE_DATABASE_URL
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, database };
