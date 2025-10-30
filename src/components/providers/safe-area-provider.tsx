import { createContext, useContext, useEffect, useState } from 'react'
import { getPlatform } from '@/utils/platform-detection'

interface SafeAreaInsets {
    top: number
    right: number
    bottom: number
    left: number
}

interface SafeAreaContextValue {
    insets: SafeAreaInsets
    isMobile: boolean
}

const SafeAreaContext = createContext<SafeAreaContextValue>({
    insets: { top: 0, right: 0, bottom: 0, left: 0 },
    isMobile: false
})

export function SafeAreaProvider({ children }: { children: React.ReactNode }) {
    const { isMobile } = getPlatform()
    const [insets, setInsets] = useState<SafeAreaInsets>({
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    })

    useEffect(() => {
        if (!isMobile) return

        const updateInsets = () => {
            const style = getComputedStyle(document.documentElement)
            setInsets({
                top: parseInt(style.getPropertyValue('--sat') || '0'),
                right: parseInt(style.getPropertyValue('--sar') || '0'),
                bottom: parseInt(style.getPropertyValue('--sab') || '0'),
                left: parseInt(style.getPropertyValue('--sal') || '0')
            })
        }

        // Set CSS variables for safe area insets
        const setInsetVars = () => {
            const safeAreaTop = parseInt(
                getComputedStyle(document.documentElement).getPropertyValue(
                    'env(safe-area-inset-top, 0px)'
                )
            )
            const safeAreaBottom = parseInt(
                getComputedStyle(document.documentElement).getPropertyValue(
                    'env(safe-area-inset-bottom, 0px)'
                )
            )

            document.documentElement.style.setProperty(
                '--sat',
                `${safeAreaTop || 0}`
            )
            document.documentElement.style.setProperty(
                '--sar',
                `${parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-right, 0px)')) || 0}`
            )
            document.documentElement.style.setProperty(
                '--sab',
                `${safeAreaBottom || 0}`
            )
            document.documentElement.style.setProperty(
                '--sal',
                `${parseInt(getComputedStyle(document.documentElement).getPropertyValue('env(safe-area-inset-left, 0px)')) || 0}`
            )

            updateInsets()
        }

        setInsetVars()
        window.addEventListener('resize', setInsetVars)

        return () => window.removeEventListener('resize', setInsetVars)
    }, [isMobile])

    return (
        <SafeAreaContext.Provider value={{ insets, isMobile }}>
            {isMobile ? (
                <div
                    className="h-screen w-screen overflow-hidden"
                    style={{
                        paddingTop: `${insets.top}px`,
                        paddingBottom: `${insets.bottom}px`,
                        paddingLeft: `${insets.left}px`,
                        paddingRight: `${insets.right}px`
                    }}
                >
                    <div className="h-full w-full overflow-auto">
                        {children}
                    </div>
                </div>
            ) : (
                children
            )}
        </SafeAreaContext.Provider>
    )
}

export function useSafeArea() {
    return useContext(SafeAreaContext)
}
