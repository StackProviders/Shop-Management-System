import { useState, useCallback, useMemo, ReactNode } from 'react'
import { useAuth } from '@/features/auth'
import { Button, buttonVariants } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { VariantProps } from 'class-variance-authority'
import { ConfirmationDialog } from '@/components/common'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'

interface LogoutButtonProps {
    variant?: VariantProps<typeof buttonVariants>['variant']
    size?: VariantProps<typeof buttonVariants>['size']
    showIcon?: boolean
    showConfirm?: boolean
    children?: ReactNode
    className?: string
    alertOpen?: boolean
    onAlertClose?: (open: boolean) => void
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
    const { signOut, loading } = useAuth()
    const router = useRouter()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = useCallback(async () => {
        setIsLoggingOut(true)
        try {
            await signOut()
            router.replace('/auth')
        } catch (error) {
            console.error('Logout failed:', error)
            setIsLoggingOut(false)
        }
    }, [signOut, router])

    const isDisabled = isLoggingOut || loading
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
        <>
            {children && (
                <div onClick={() => onAlertClose?.(true)}>{children}</div>
            )}
            <ConfirmationDialog
                open={alertOpen ?? false}
                onOpenChange={(open) => onAlertClose?.(open)}
                onConfirm={handleLogout}
                title="Confirm Logout"
                description="Are you sure you want to logout? You'll need to sign in again to access your account."
                confirmText="Logout"
                cancelText="Cancel"
            />
        </>
    )
}
