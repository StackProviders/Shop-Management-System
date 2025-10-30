import { createContext, useContext } from 'react'
import { useSafeAreaInsets } from '@/hooks/use-safe-area-insets'

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
    const { insets, isMobile } = useSafeAreaInsets()

    return (
        <SafeAreaContext.Provider value={{ insets, isMobile }}>
            {isMobile ? (
                <div
                    className="h-screen w-screen overflow-hidden"
                    style={{
                        paddingTop: 'var(--sat)',
                        paddingBottom: 'var(--sab)',
                        paddingLeft: 'var(--sal)',
                        paddingRight: 'var(--sar)'
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
