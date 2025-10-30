import { getCurrentWindow } from '@tauri-apps/api/window'
import {
    restoreStateCurrent,
    saveWindowState,
    StateFlags
} from '@tauri-apps/plugin-window-state'

export async function setupWindowBehavior() {
    const window = getCurrentWindow()

    // Restore window state
    await restoreStateCurrent(StateFlags.ALL)

    // Prevent window close, hide instead
    await window.onCloseRequested(async (event) => {
        event.preventDefault()
        await saveWindowState(StateFlags.ALL)
        await window.hide()
    })
}
