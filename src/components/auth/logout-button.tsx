import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { LogOut, Loader2 } from 'lucide-react'
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

interface LogoutButtonProps {
    variant?:
        | 'default'
        | 'destructive'
        | 'outline'
        | 'secondary'
        | 'ghost'
        | 'link'
    size?: 'default' | 'sm' | 'lg' | 'icon'
    showIcon?: boolean
    showConfirm?: boolean
}

export function LogoutButton({
    variant = 'ghost',
    size = 'default',
    showIcon = true,
    showConfirm = true
}: LogoutButtonProps) {
    const { logout, authState } = useAuth()
    const [isLoggingOut, setIsLoggingOut] = useState(false)

    const handleLogout = async () => {
        setIsLoggingOut(true)
        try {
            await logout()
            window.location.href = '/auth'
        } catch (error) {
            console.error('Logout failed:', error)
        } finally {
            setIsLoggingOut(false)
        }
    }

    const LogoutBtn = (
        <Button
            variant={variant}
            size={size}
            onClick={showConfirm ? undefined : handleLogout}
            disabled={isLoggingOut || authState.loading}
        >
            {isLoggingOut ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                showIcon && <LogOut className="h-4 w-4" />
            )}
            {size !== 'icon' && (
                <span className={showIcon ? 'ml-2' : ''}>Logout</span>
            )}
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
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleLogout}
                        disabled={isLoggingOut}
                    >
                        {isLoggingOut ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Logging out...
                            </>
                        ) : (
                            'Logout'
                        )}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
