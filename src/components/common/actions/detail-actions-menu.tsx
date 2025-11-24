'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { ConfirmationDialog } from '../dialogs/confirmation-dialog'
import { Copy, MoreVertical, Pen, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface DetailActionsMenuProps<T> {
    item: T
    itemName: string
    editPath?: string
    duplicatePath?: string
    listPath?: string
    onDelete?: (id: string) => Promise<void>
    getDuplicateData?: (item: T) => Record<string, unknown>
    onEditClick?: () => void
    onDeleteClick?: () => void
    compact?: boolean
}

export function DetailActionsMenu<T extends { id: string }>({
    item,
    itemName,
    editPath,
    duplicatePath,
    listPath,
    onDelete,
    getDuplicateData,
    onEditClick,
    onDeleteClick,
    compact = false
}: DetailActionsMenuProps<T>) {
    const router = useRouter()
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

    const handleEdit = () => {
        if (onEditClick) {
            onEditClick()
        } else if (editPath) {
            router.push(editPath)
        }
    }

    const handleDuplicate = () => {
        if (getDuplicateData && duplicatePath) {
            const duplicateData = getDuplicateData(item)
            const searchParams = new URLSearchParams()
            Object.entries(duplicateData).forEach(([key, value]) => {
                if (value !== undefined && value !== null) {
                    searchParams.append(key, String(value))
                }
            })
            router.push(`${duplicatePath}?${searchParams.toString()}`)
            toast.success(`${itemName} data copied for duplication`)
        }
    }

    const handleDelete = async () => {
        try {
            if (onDelete) {
                await onDelete(item.id)
                setDeleteConfirmOpen(false)
                if (listPath) router.push(listPath)
            }
        } catch {
            // Error handled in mutation hook
        }
    }

    const handleDeleteClick = () => {
        if (onDeleteClick) {
            onDeleteClick()
        } else {
            setDeleteConfirmOpen(true)
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        size={compact ? 'sm' : 'icon'}
                        variant="ghost"
                        className={compact ? 'h-8 w-8 p-0' : ''}
                    >
                        <MoreVertical className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={handleEdit}>
                        <Pen />
                        Edit
                        {!compact && (
                            <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                        )}
                    </DropdownMenuItem>
                    {getDuplicateData && duplicatePath && (
                        <DropdownMenuItem onClick={handleDuplicate}>
                            <Copy />
                            Duplicate
                            {!compact && (
                                <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                            )}
                        </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={handleDeleteClick}
                    >
                        <Trash2 />
                        Delete
                        {!compact && (
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {onDelete && (
                <ConfirmationDialog
                    open={deleteConfirmOpen}
                    onOpenChange={setDeleteConfirmOpen}
                    onConfirm={handleDelete}
                    title="Delete Item"
                    description={`This will permanently delete ${itemName}. This action cannot be undone.`}
                    confirmText="Delete"
                    variant="destructive"
                />
            )}
        </>
    )
}
