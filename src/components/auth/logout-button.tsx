import { useState, useCallback, useMemo, ReactNode } from 'react'
import { useAuth } from '@/features/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { VariantProps } from 'class-variance-authority'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { useNavigate } from 'react-router'
import { Spinner } from '@/components/ui/spinner'

interface LogoutButtonProps {
    variant?: VariantProps<typeof buttonVariants>['variant']
    size?: VariantProps<typeof buttonVariants>['size']
    mode?: VariantProps<typeof buttonVariants>['mode']
    showIcon?: boolean
    showConfirm?: boolean
    children?: ReactNode
}

export function LogoutButton({
    variant = 'ghost',
    size = 'md',
    mode,
    showIcon = true,
    showConfirm = true,
    children
}: LogoutButtonProps) {
    const { logout, authState } = useAuth()
    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = useCallback(async () => {
        setIsLoggingOut(true)
        try {
            await logout()
            navigate('/auth', { replace: true })
        } catch (error) {
            console.error('Logout failed:', error)
            setIsLoggingOut(false)
        }
    }, [logout, navigate])

    const isDisabled = isLoggingOut || authState.loading
    const isIconSize = size === 'icon'

    const buttonContent = useMemo(
        () => (
            <>
                {isLoggingOut ? (
                    <Spinner className="size-4" />
                ) : (
                    showIcon && <LogOut className="size-4" />
                )}
                {!isIconSize && <span>Logout</span>}
            </>
        ),
        [isLoggingOut, showIcon, isIconSize]
    )

    const LogoutBtn = children ? (
        <div onClick={showConfirm ? undefined : handleLogout}>{children}</div>
    ) : (
        <Button
            variant={variant}
            size={size}
            mode={mode}
            onClick={showConfirm ? undefined : handleLogout}
            disabled={isDisabled}
            aria-label="Logout"
        >
            {buttonContent}
        </Button>
    )

    if (!showConfirm) {
        return LogoutBtn
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>{LogoutBtn}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to logout? You&apos;ll need to
                        sign in again to access your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoggingOut}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleLogout}
                        disabled={isDisabled}
                        variant="destructive"
                    >
                        {isLoggingOut ? (
                            <Spinner className="size-4" />
                        ) : (
                            showIcon && <LogOut className="size-4" />
                        )}
                        <span>Logout</span>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
