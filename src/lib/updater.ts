import { check } from '@tauri-apps/plugin-updater'
import { ask, message } from '@tauri-apps/plugin-dialog'
import { relaunch, exit } from '@tauri-apps/plugin-process'

export async function checkForAppUpdates(onUserClick: boolean = false) {
    const update = await check()
    if (update?.available) {
        const yes = await ask(
            `Update to ${update.version} is available!\n\nRelease notes: ${update.body}`,
            {
                title: 'Update Available',
                kind: 'info',
                okLabel: 'Update',
                cancelLabel: 'Cancel'
            }
        )
        if (yes) {
            await update.downloadAndInstall()
            await relaunch()
        } else {
            await exit(0)
        }
    } else if (onUserClick) {
        await message('You are on the latest version. Stay awesome!', {
            title: 'No Update Available',
            kind: 'info',
            okLabel: 'OK'
        })
    }
}
