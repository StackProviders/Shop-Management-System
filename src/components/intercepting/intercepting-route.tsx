import { ReactNode } from 'react'
import { useInterceptingRoute } from '@/lib/intercepting-routes'
import { FormModal } from '@/components'
import { ResponsiveModal } from '@/components/responsive/responsive-modal'

interface InterceptingRouteProps {
    isIntercepting: boolean
    fallbackPath: string
    children: ReactNode
    fullPageClassName?: string
    modalType?: 'form' | 'responsive'
    modalProps?: {
        title?: string
        description?: string
        formId?: string
        isDirty?: boolean
        submitLabel?: string
        isSubmitting?: boolean
        className?: string
        showHeader?: boolean
        contentClassName?: string
        showCloseButton?: boolean
        header?: ReactNode
        footer?: ReactNode
    }
}

export function InterceptingRoute({
    isIntercepting,
    fallbackPath,
    children,
    fullPageClassName = 'h-full overflow-y-auto p-6',
    modalType = 'form',
    modalProps = {}
}: InterceptingRouteProps) {
    const { handleClose } = useInterceptingRoute(isIntercepting, fallbackPath)

    console.log({ isDirty: modalProps.isDirty })

    if (!isIntercepting) {
        return <div className={fullPageClassName}>{children}</div>
    }

    if (modalType === 'responsive') {
        return (
            <ResponsiveModal
                open={true}
                onOpenChange={(open: boolean) => !open && handleClose()}
                showHeader={modalProps.showHeader ?? false}
                className={modalProps.className}
                contentClassName={modalProps.contentClassName}
                showCloseButton={modalProps.showCloseButton}
                header={modalProps.header}
                footer={modalProps.footer}
                formId={modalProps.formId}
                submitLabel={modalProps.submitLabel}
                isSubmitting={modalProps.isSubmitting}
            >
                {children}
            </ResponsiveModal>
        )
    }

    return (
        <FormModal
            open={true}
            onOpenChange={(open) => !open && handleClose()}
            title={modalProps.title ?? ''}
            description={modalProps.description}
            formId={modalProps.formId ?? ''}
            isDirty={modalProps.isDirty}
            submitLabel={modalProps.submitLabel}
            className={modalProps.className}
            header={modalProps.header}
            showCloseButton={modalProps.showCloseButton ?? true}
            footer={modalProps.footer}
            contentClassName={modalProps.contentClassName}
            showHeader={modalProps.showHeader ?? false}
            isSubmitting={modalProps.isSubmitting}
        >
            {children}
        </FormModal>
    )
}
