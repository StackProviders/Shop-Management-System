import { ReactNode } from 'react'

export default function ItemsLayout({
    children,
    modal
}: {
    children: ReactNode
    modal: ReactNode
}) {
    return (
        <>
            {children}
            {modal}
        </>
    )
}
