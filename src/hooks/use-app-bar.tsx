import { useEffect, useRef } from 'react'
import {
    useAppBar as useAppBarContext,
    AppBarConfig
} from '@/components/providers/app-bar'
import { useIsMobile } from './use-mobile'
import { useLocation } from '@tanstack/react-router'

interface UseAppBarConfig extends AppBarConfig {
    mobileOnly?: boolean
    deps?: unknown[]
}

export function useAppBar(config?: UseAppBarConfig) {
    const { configure, reset } = useAppBarContext()
    const isMobile = useIsMobile()
    const location = useLocation()
    const configRef = useRef(config)

    configRef.current = config

    useEffect(() => {
        const currentConfig = configRef.current
        if (!currentConfig) return

        const mobileOnly = currentConfig.mobileOnly ?? true
        const shouldApply = mobileOnly ? isMobile : true

        if (shouldApply) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { mobileOnly, deps, ...appBarConfig } = currentConfig
            configure(appBarConfig)
        }

        return () => reset()
    }, [location.pathname, isMobile, configure, reset, ...(config?.deps ?? [])])

    return { configure, reset }
}
