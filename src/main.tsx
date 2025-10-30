import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app'
import { initializeDesktop } from '@/lib/desktop'
import { firebaseConfig } from '@/lib/firebase'
import { FirebaseAppProvider } from 'reactfire'
// import '@saurl/tauri-plugin-safe-area-insets-css-api';

// Initialize desktop features once
if (typeof window !== 'undefined' && '__TAURI__' in window) {
    let initialized = false
    const init = () => {
        if (!initialized) {
            initialized = true
            initializeDesktop()
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init, { once: true })
    } else {
        init()
    }
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <FirebaseAppProvider firebaseConfig={firebaseConfig} suspense={true}>
            <App />
        </FirebaseAppProvider>
    </React.StrictMode>
)
