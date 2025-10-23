import { useEffect, useMemo } from 'react'
import { useAppBar as useAppBarContext, QuickAction } from '@/contexts/app-bar'
import { useIsMobile } from './use-mobile'
import { ReactNode } from 'react'

interface UseAppBarConfig {
    title?: string | ReactNode
    showBackButton?: boolean
    onBack?: () => void
    actions?: ReactNode
    showBottomActions?: boolean
    mobileOnly?: boolean
    bottomActions?: QuickAction[]
    showQuickActionCenter?: boolean
}

export function useAppBar(config?: UseAppBarConfig) {
    const { configure, reset } = useAppBarContext()
    const isMobile = useIsMobile()

    const shouldApply = useMemo(() => {
        if (!config) return false
        const mobileOnly = config.mobileOnly ?? true
        if (mobileOnly) return isMobile
        return true
    }, [config, isMobile])

    useEffect(() => {
        if (shouldApply && config) {
            configure(config)
        }
        return () => reset()
    }, [
        shouldApply,
        config?.title,
        config?.showBackButton,
        config?.showBottomActions,
        configure,
        reset
    ])

    return { configure, reset }
}
