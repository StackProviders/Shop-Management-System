'use client'

import { Button } from '@/components/ui/button'
import { useAuth } from '@/features/auth'
import { LogOut } from 'lucide-react'
import { VariantProps } from 'class-variance-authority'
import { ReactNode, useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
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
    variant?: VariantProps<typeof buttonVariants>['variant']
    size?: VariantProps<typeof buttonVariants>['size']
    showIcon?: boolean
    children?: ReactNode
    className?: string
    showConfirm?: boolean
    alertOpen?: boolean
    onAlertClose?: (open: boolean) => void
}

export function LogoutButton({
    variant = 'ghost',
    size = 'default',
    showIcon = true,
    children,
    className,
    showConfirm = false,
    alertOpen,
    onAlertClose
}: LogoutButtonProps) {
    const { signOut } = useAuth()
    const [internalOpen, setInternalOpen] = useState(false)

    const open = alertOpen !== undefined ? alertOpen : internalOpen
    const onOpenChange = onAlertClose || setInternalOpen

    const handleLogout = () => {
        signOut()
        onOpenChange(false)
    }

    if (showConfirm) {
        return (
            <AlertDialog open={open} onOpenChange={onOpenChange}>
                <AlertDialogTrigger asChild>
                    <Button variant={variant} size={size} className={className}>
                        {showIcon && <LogOut className="mr-2 h-4 w-4" />}
                        {children || 'Logout'}
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            You will be logged out of your account.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>
                            Log out
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        )
    }

    return (
        <Button
            variant={variant}
            size={size}
            onClick={signOut}
            className={className}
        >
            {showIcon && <LogOut className="mr-2 h-4 w-4" />}
            {children || 'Logout'}
        </Button>
    )
}
