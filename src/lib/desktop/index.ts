import { setupAppMenu } from './app-menu'
import { setupSystemTray } from './system-tray'
import { setupWindowBehavior } from './window-behavior'

export async function initializeDesktop() {
    try {
        await setupWindowBehavior()
        // await setupAppMenu()
        await setupSystemTray()
        console.log('Desktop features initialized')
    } catch (error) {
        console.error('Failed to initialize desktop features:', error)
    }
}

export { setupAppMenu, setupSystemTray, setupWindowBehavior }
