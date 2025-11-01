import { ReactNode, memo } from 'react'
import { ResponsiveModal } from './responsive-modal'
import { Button, SubmitButton } from '@/components/ui/button'

interface FormModalProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    title?: string
    description?: string
    children: ReactNode
    formId: string
    onCancel: () => void
    submitLabel?: string
    cancelLabel?: string
    className?: string
    contentClassName?: string
    showHeader?: boolean
    header?: ReactNode
    isSubmitting?: boolean
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
    isSubmitting = false
}: FormModalProps) {
    return (
        <ResponsiveModal
            open={open}
            onOpenChange={onOpenChange}
            title={title}
            description={description}
            className={className}
            contentClassName={contentClassName}
            showHeader={showHeader}
            header={header}
            footer={
                <div className="flex gap-2 w-full">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={onCancel}
                        disabled={isSubmitting}
                        className="flex-1"
                    >
                        {cancelLabel}
                    </Button>
                    <SubmitButton
                        form={formId}
                        loading={isSubmitting}
                        className="flex-1"
                    >
                        {submitLabel}
                    </SubmitButton>
                </div>
            }
        >
            {children}
        </ResponsiveModal>
    )
})
