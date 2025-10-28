import React from 'react'
import ReactDOM from 'react-dom/client'
import App from '@/app'
import { initializeDesktop } from '@/lib/desktop'

// Initialize desktop features after DOM is ready
if (typeof window !== 'undefined' && '__TAURI__' in window) {
    document.addEventListener('DOMContentLoaded', () => {
        initializeDesktop()
    })
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
