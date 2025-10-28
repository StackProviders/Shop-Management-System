import { Menu, MenuItem, Submenu } from '@tauri-apps/api/menu'
import { exit } from '@tauri-apps/plugin-process'

export async function setupAppMenu() {
    const fileSubmenu = await Submenu.new({
        text: 'File',
        items: [
            await MenuItem.new({
                id: 'new-shop',
                text: 'New Shop',
                accelerator: 'CmdOrCtrl+N',
                action: () => console.log('New Shop')
            }),
            await MenuItem.new({
                id: 'settings',
                text: 'Settings',
                accelerator: 'CmdOrCtrl+,',
                action: () => console.log('Settings')
            }),
            await MenuItem.new({
                id: 'separator-1',
                text: '---'
            }),
            await MenuItem.new({
                id: 'quit',
                text: 'Quit',
                accelerator: 'CmdOrCtrl+Q',
                action: () => exit()
            })
        ]
    })

    const editSubmenu = await Submenu.new({
        text: 'Edit',
        items: [
            await MenuItem.new({
                id: 'undo',
                text: 'Undo',
                accelerator: 'CmdOrCtrl+Z',
                action: () => console.log('Undo')
            }),
            await MenuItem.new({
                id: 'redo',
                text: 'Redo',
                accelerator: 'CmdOrCtrl+Shift+Z',
                action: () => console.log('Redo')
            })
        ]
    })

    const helpSubmenu = await Submenu.new({
        text: 'Help',
        items: [
            await MenuItem.new({
                id: 'about',
                text: 'About',
                action: () => console.log('About')
            }),
            await MenuItem.new({
                id: 'documentation',
                text: 'Documentation',
                action: () => console.log('Documentation')
            })
        ]
    })

    const menu = await Menu.new({
        items: [fileSubmenu, editSubmenu, helpSubmenu]
    })

    await menu.setAsAppMenu()
}
