import { TrayIcon } from '@tauri-apps/api/tray'
import { Menu, MenuItem } from '@tauri-apps/api/menu'
import { defaultWindowIcon } from '@tauri-apps/api/app'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { exit } from '@tauri-apps/plugin-process'

export async function setupSystemTray() {
    const window = getCurrentWindow()
    const icon = await defaultWindowIcon()

    if (!icon) {
        console.warn('No default icon available for system tray')
        return
    }

    const trayMenu = await Menu.new({
        items: [
            await MenuItem.new({
                id: 'show',
                text: 'Show Window',
                action: async () => {
                    await window.show()
                    await window.unminimize()
                    await window.setFocus()
                }
            }),
            await MenuItem.new({
                id: 'hide',
                text: 'Hide Window',
                action: () => window.hide()
            }),
            await MenuItem.new({
                id: 'separator-1',
                text: '---------------------',
                enabled: false
            }),
            await MenuItem.new({
                id: 'quit',
                text: 'Quit',
                action: () => exit()
            })
        ]
    })

    await TrayIcon.new({
        icon,
        menu: trayMenu,
        tooltip: 'Shop Management System',
        menuOnLeftClick: false,
        action: async (event) => {
            if (event.type === 'Click' && event.button === 'Left') {
                const isVisible = await window.isVisible()
                if (isVisible) {
                    await window.hide()
                } else {
                    await window.show()
                    await window.unminimize()
                    await window.setFocus()
                }
            }
        }
    })
}
