import { ReactNode } from 'react'

export default function PartiesLayout({
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
