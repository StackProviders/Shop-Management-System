import { ConfirmationDialog } from './common/dialogs/confirmation-dialog'

interface DeleteConfirmationDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    onConfirm: () => void | Promise<void>
    title?: string
    description: string
    confirmText?: string
    cancelText?: string
}

export function DeleteConfirmationDialog({
    open,
    onOpenChange,
    onConfirm,
    title = 'Are you sure?',
    description,
    confirmText = 'Delete',
    cancelText = 'Cancel'
}: DeleteConfirmationDialogProps) {
    return (
        <ConfirmationDialog
            open={open}
            onOpenChange={onOpenChange}
            onConfirm={onConfirm}
            title={title}
            description={description}
            confirmText={confirmText}
            cancelText={cancelText}
            variant="destructive"
        />
    )
}
