import { useState, useEffect } from 'react'
import { getCurrentWindow } from '@tauri-apps/api/window'
import { Minus, Square, Copy, X } from 'lucide-react'

export function WindowsWindowControls() {
    const [isMaximized, setIsMaximized] = useState(false)

    useEffect(() => {
        const checkMaximized = async () => {
            const maximized = await getCurrentWindow().isMaximized()
            setIsMaximized(maximized)
        }

        checkMaximized()

        const unlisten = getCurrentWindow().onResized(() => {
            checkMaximized()
        })

        return () => {
            unlisten.then((fn) => fn())
        }
    }, [])

    const handleMinimize = () => {
        getCurrentWindow().minimize()
    }

    const handleMaximize = () => {
        getCurrentWindow().toggleMaximize()
    }

    const handleClose = () => {
        getCurrentWindow().close()
    }

    return (
        <div className="flex h-full items-center">
            <button
                type="button"
                onClick={handleMinimize}
                className="flex h-full w-12 items-center justify-center hover:bg-accent transition-colors"
                aria-label="Minimize"
            >
                <Minus className="h-4 w-4" />
            </button>
            <button
                type="button"
                onClick={handleMaximize}
                className="flex h-full w-12 items-center justify-center hover:bg-accent transition-colors"
                aria-label={isMaximized ? 'Restore' : 'Maximize'}
            >
                {isMaximized ? (
                    <Copy className="h-3.5 w-3.5" />
                ) : (
                    <Square className="h-3.5 w-3.5" />
                )}
            </button>
            <button
                type="button"
                onClick={handleClose}
                className="flex h-full w-12 items-center justify-center hover:bg-destructive hover:text-destructive-foreground transition-colors"
                aria-label="Close"
            >
                <X className="h-4 w-4" />
            </button>
        </div>
    )
}
