import {
    createContext,
    useContext,
    useReducer,
    useCallback,
    ReactNode,
    memo
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

export interface AppBarConfig {
    title?: string | ReactNode | null
    showBackButton?: boolean
    onBack?: (() => void) | null
    actions?: ReactNode | null
    showBottomActions?: boolean
    bottomActions?: QuickAction[]
    showQuickActionCenter?: boolean
}

interface AppBarState {
    title: string | ReactNode | null
    showBackButton: boolean
    onBack: (() => void) | null
    actions: ReactNode | null
    showBottomActions: boolean
    bottomActions: QuickAction[]
    showQuickActionCenter: boolean
}

type AppBarAction =
    | { type: 'CONFIGURE'; payload: AppBarConfig }
    | { type: 'RESET' }

interface AppBarContextType extends AppBarState {
    configure: (config: AppBarConfig) => void
    reset: () => void
}

const initialState: AppBarState = {
    title: null,
    showBackButton: false,
    onBack: null,
    actions: null,
    showBottomActions: true,
    bottomActions: [],
    showQuickActionCenter: true
}

function appBarReducer(state: AppBarState, action: AppBarAction): AppBarState {
    switch (action.type) {
        case 'CONFIGURE':
            return {
                ...state,
                ...(action.payload.title !== undefined && {
                    title: action.payload.title
                }),
                ...(action.payload.showBackButton !== undefined && {
                    showBackButton: action.payload.showBackButton
                }),
                ...(action.payload.onBack !== undefined && {
                    onBack: action.payload.onBack
                }),
                ...(action.payload.actions !== undefined && {
                    actions: action.payload.actions
                }),
                ...(action.payload.showBottomActions !== undefined && {
                    showBottomActions: action.payload.showBottomActions
                }),
                ...(action.payload.bottomActions !== undefined && {
                    bottomActions: action.payload.bottomActions
                }),
                ...(action.payload.showQuickActionCenter !== undefined && {
                    showQuickActionCenter: action.payload.showQuickActionCenter
                })
            }
        case 'RESET':
            return initialState
        default:
            return state
    }
}

const AppBarContext = createContext<AppBarContextType | undefined>(undefined)

export const AppBarProvider = memo(({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(appBarReducer, initialState)

    const configure = useCallback((config: AppBarConfig) => {
        dispatch({ type: 'CONFIGURE', payload: config })
    }, [])

    const reset = useCallback(() => {
        dispatch({ type: 'RESET' })
    }, [])

    return (
        <AppBarContext.Provider
            value={{
                ...state,
                configure,
                reset
            }}
        >
            {children}
        </AppBarContext.Provider>
    )
})

AppBarProvider.displayName = 'AppBarProvider'

export function useAppBar() {
    const context = useContext(AppBarContext)
    if (!context) {
        throw new Error('useAppBar must be used within AppBarProvider')
    }
    return context
}
