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
import { useNavigate } from '@tanstack/react-router'
import { Spinner } from '@/components/ui/spinner'

interface LogoutButtonProps {
    variant?: VariantProps<typeof buttonVariants>['variant']
    size?: VariantProps<typeof buttonVariants>['size']
    showIcon?: boolean
    showConfirm?: boolean
    children?: ReactNode
    className?: string
    alertOpen?: boolean
    onAlertClose?: () => void
}

export function LogoutButton({
    variant = 'ghost',
    size = 'default',
    showIcon = true,
    showConfirm = true,
    children,
    className,
    alertOpen,
    onAlertClose
}: LogoutButtonProps) {
    const { logout, authState } = useAuth()
    const navigate = useNavigate()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = useCallback(async () => {
        setIsLoggingOut(true)
        try {
            await logout()
            navigate({ to: '/auth', replace: true })
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

    if (!showConfirm) {
        return children ? (
            <div onClick={handleLogout}>{children}</div>
        ) : (
            <Button
                variant={variant}
                size={size}
                onClick={handleLogout}
                disabled={isDisabled}
                aria-label="Logout"
                className={className}
            >
                {buttonContent}
            </Button>
        )
    }

    return (
        <AlertDialog open={alertOpen} onOpenChange={onAlertClose}>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
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
                        disabled={isDisabled}
                        onClick={(e) => {
                            e.preventDefault()
                            handleLogout()
                        }}
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
