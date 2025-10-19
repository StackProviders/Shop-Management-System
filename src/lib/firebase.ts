import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    enableIndexedDbPersistence,
    enableMultiTabIndexedDbPersistence
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || ''
}

if (!firebaseConfig.projectId) {
    throw new Error(
        'Firebase projectId is missing. Please configure .env file with VITE_FIREBASE_PROJECT_ID'
    )
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const storage = getStorage(app)

// Enable offline persistence with multi-tab support
enableMultiTabIndexedDbPersistence(db).catch((err) => {
    if (err.code === 'failed-precondition') {
        console.warn('Persistence failed: Multiple tabs open')
        // Fallback to single-tab persistence
        enableIndexedDbPersistence(db).catch((e) => {
            console.warn('Single-tab persistence also failed:', e)
        })
    } else if (err.code === 'unimplemented') {
        console.warn('Browser does not support offline persistence')
    }
})
