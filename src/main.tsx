import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app'
import { initializeDesktop } from '@/lib/desktop'
import { firebaseConfig } from '@/lib/firebase'
import { FirebaseAppProvider } from 'reactfire'

// Initialize desktop features after DOM is ready
if (typeof window !== 'undefined' && '__TAURI__' in window) {
    document.addEventListener('DOMContentLoaded', () => {
        initializeDesktop()
    })
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
            <App />
        </FirebaseAppProvider>
    </React.StrictMode>
)
