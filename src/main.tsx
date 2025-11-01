import React from 'react'
import ReactDOM from 'react-dom/client'
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'
import App from '@/app'
import { initializeDesktop } from '@/lib/desktop'
import { firebaseConfig } from '@/lib/firebase'
import { FirebaseAppProvider } from 'reactfire'

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
            <NuqsAdapter>
                <App />
            </NuqsAdapter>
        </FirebaseAppProvider>
    </React.StrictMode>
)
