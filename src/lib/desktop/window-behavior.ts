import { getCurrentWindow } from '@tauri-apps/api/window'

export async function setupWindowBehavior() {
    const window = getCurrentWindow()

    // Prevent window close, hide instead
    await window.onCloseRequested(async (event) => {
        event.preventDefault()
        await window.hide()
    })
}
