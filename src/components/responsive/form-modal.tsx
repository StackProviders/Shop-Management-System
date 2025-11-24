'use client'

import { ReactNode, memo, useState } from 'react'
import { ResponsiveModal } from './responsive-modal'
import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from '@/components/ui/alert-dialog'

interface FormModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
    description?: string
    children: ReactNode
    formId: string
    onCancel?: () => void
    submitLabel?: string
    cancelLabel?: string
    className?: string
    contentClassName?: string
    showHeader?: boolean
    header?: ReactNode
    footer?: ReactNode
    showCloseButton?: boolean
    isSubmitting?: boolean
    isDirty?: boolean
    confirmTitle?: string
    confirmDescription?: string
}

export const FormModal = memo(function FormModal({
    open,
    onOpenChange,
    title,
    description,
    children,
    formId,
    onCancel,
    submitLabel = 'Submit',
    cancelLabel = 'Cancel',
    className,
    contentClassName,
    showHeader,
    header,
    footer,
    showCloseButton = true,
    isSubmitting = false,
    isDirty = false,
    confirmTitle = 'Discard changes?',
    confirmDescription = 'Your changes will be lost.'
}: FormModalProps) {
    const [confirmOpen, setConfirmOpen] = useState(false)

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            if (isDirty) {
                setConfirmOpen(true)
                return
            }
            onCancel?.()
        }
        onOpenChange(newOpen)
    }

    const handleDiscard = () => {
        setConfirmOpen(false)
        onCancel?.()
        onOpenChange(false)
    }

    return (
        <>
            <ResponsiveModal
                open={open}
                onOpenChange={handleOpenChange}
                title={title}
                description={description}
                className={className}
                contentClassName={contentClassName}
                showHeader={showHeader}
                header={header}
                showCloseButton={showCloseButton}
                formId={formId}
                isSubmitting={isSubmitting}
                submitLabel={submitLabel}
                cancelLabel={cancelLabel}
                footer={footer}
            >
                {children}
            </ResponsiveModal>

            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>{confirmTitle}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {confirmDescription}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel render={<Button variant="ghost" />}>
                            Go back
                        </AlertDialogCancel>
                        <AlertDialogAction
                            render={<Button variant="destructive-outline" />}
                            onClick={handleDiscard}
                        >
                            Discard
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    )
})
