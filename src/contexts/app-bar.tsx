import {
    createContext,
    useContext,
    useState,
    useCallback,
    ReactNode
} from 'react'
import { LucideIcon } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import type { VariantProps } from 'class-variance-authority'

export interface QuickAction {
    icon: LucideIcon
    label: string
    onClick: () => void
    variant?: VariantProps<typeof buttonVariants>['variant']
    className?: string
}

interface AppBarConfig {
    title?: string | ReactNode | null
    showBackButton?: boolean
    onBack?: (() => void) | null
    actions?: ReactNode | null
    showBottomActions?: boolean
    bottomActions?: QuickAction[]
    showQuickActionCenter?: boolean
}

interface AppBarContextType {
    title: string | ReactNode | null
    showBackButton: boolean
    onBack: (() => void) | null
    actions: ReactNode | null
    showBottomActions: boolean
    bottomActions: QuickAction[]
    showQuickActionCenter: boolean
    configure: (config: AppBarConfig) => void
    reset: () => void
}

const AppBarContext = createContext<AppBarContextType | undefined>(undefined)

export function AppBarProvider({ children }: { children: ReactNode }) {
    const [title, setTitle] = useState<string | ReactNode | null>(null)
    const [showBackButton, setShowBackButton] = useState(false)
    const [onBack, setOnBack] = useState<(() => void) | null>(null)
    const [actions, setActions] = useState<ReactNode | null>(null)
    const [showBottomActions, setShowBottomActions] = useState(true)
    const [bottomActions, setBottomActions] = useState<QuickAction[]>([])
    const [showQuickActionCenter, setShowQuickActionCenter] = useState(true)

    const configure = useCallback((config: AppBarConfig) => {
        if (config.title !== undefined) setTitle(config.title)
        if (config.showBackButton !== undefined)
            setShowBackButton(config.showBackButton)
        if (config.onBack !== undefined) setOnBack(() => config.onBack)
        if (config.actions !== undefined) setActions(config.actions)
        if (config.showBottomActions !== undefined)
            setShowBottomActions(config.showBottomActions)
        if (config.bottomActions !== undefined)
            setBottomActions(config.bottomActions)
        if (config.showQuickActionCenter !== undefined)
            setShowQuickActionCenter(config.showQuickActionCenter)
    }, [])

    const reset = useCallback(() => {
        setTitle(null)
        setShowBackButton(false)
        setOnBack(null)
        setActions(null)
        setShowBottomActions(true)
        setBottomActions([])
        setShowQuickActionCenter(true)
    }, [])

    return (
        <AppBarContext.Provider
            value={{
                title,
                showBackButton,
                onBack,
                actions,
                showBottomActions,
                bottomActions,
                showQuickActionCenter,
                configure,
                reset
            }}
        >
            {children}
        </AppBarContext.Provider>
    )
}

export function useAppBar() {
    const context = useContext(AppBarContext)
    if (!context) {
        throw new Error('useAppBar must be used within AppBarProvider')
    }
    return context
}
