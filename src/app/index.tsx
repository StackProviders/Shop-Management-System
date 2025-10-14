import './global.css'

import AppRouter from '@/app/router'
import AppProvider from '@/app/provider'
import { useEffect } from 'react';
import { checkForAppUpdates } from '@/lib/updater';

export default function App() {
    useEffect(() => {
        // check for updates
        checkForAppUpdates(false);
    }, []);

    return (
        <AppProvider>
            <AppRouter />
        </AppProvider>
    )
}
