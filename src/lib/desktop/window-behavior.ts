import { getCurrentWindow } from '@tauri-apps/api/window'
import {
    restoreStateCurrent,
    saveWindowState,
    StateFlags
} from '@tauri-apps/plugin-window-state'

const isProduction = process.env.NODE_ENV === 'production'

export async function setupWindowBehavior() {
    const window = getCurrentWindow()

    // Restore window state (production only)
    if (isProduction) {
        await restoreStateCurrent(StateFlags.ALL)
    }

    // Prevent window close, hide instead
    await window.onCloseRequested(async (event) => {
        event.preventDefault()

        // Save window state (production only)
        if (isProduction) {
            await saveWindowState(StateFlags.ALL)
        }

        await window.hide()
    })
}
