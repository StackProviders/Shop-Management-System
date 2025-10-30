import { useEffect, useState } from 'react'
import { getInsets } from 'tauri-plugin-safe-area-insets'
import { getPlatform } from '@/utils/platform-detection'

interface SafeAreaInsets {
    top: number
    right: number
    bottom: number
    left: number
}

export function useSafeAreaInsets() {
    const { isMobile } = getPlatform()
    const [insets, setInsets] = useState<SafeAreaInsets>({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    })

    useEffect(() => {
        if (!isMobile) return

        const fetchInsets = async () => {
            try {
                const result = await getInsets()
                console.log({ result })

                setInsets({
                    top: result.top,
                    right: result.right,
                    bottom: result.bottom,
                    left: result.left
                })

                // Set CSS variables
                document.documentElement.style.setProperty(
                    '--sat',
                    `${result.top}px`
                )
                document.documentElement.style.setProperty(
                    '--sar',
                    `${result.right}px`
                )
                document.documentElement.style.setProperty(
                    '--sab',
                    `${result.bottom}px`
                )
                document.documentElement.style.setProperty(
                    '--sal',
                    `${result.left}px`
                )
            } catch (error) {
                console.error('Failed to get safe area insets:', error)
            }
        }

        fetchInsets()
        window.addEventListener('resize', fetchInsets)

        return () => window.removeEventListener('resize', fetchInsets)
    }, [isMobile])

    return { insets, isMobile }
}
