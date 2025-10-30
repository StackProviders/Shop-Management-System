import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog'
import { Copy, MoreVertical, Pen, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface DetailActionsMenuProps<T> {
    item: T
    itemName: string
    editPath: string
    duplicatePath: string
    listPath: string
    onDelete: (id: string) => Promise<void>
    getDuplicateData: (item: T) => Record<string, unknown>
}

export function DetailActionsMenu<T extends { id: string }>({
    item,
    itemName,
    editPath,
    duplicatePath,
    listPath,
    onDelete,
    getDuplicateData
}: DetailActionsMenuProps<T>) {
    const navigate = useNavigate()
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)

    const handleEdit = () => {
        navigate(editPath)
    }

    const handleDuplicate = () => {
        const duplicateData = getDuplicateData(item)
        navigate(duplicatePath, { state: { duplicateFrom: duplicateData } })
        toast.success(`${itemName} data copied for duplication`)
    }

    const handleDelete = async () => {
        try {
            await onDelete(item.id)
            setDeleteConfirmOpen(false)
            navigate(listPath)
        } catch {
            // Error handled in mutation hook
        }
    }

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="ghost">
                        <MoreVertical className="size-4" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                    <DropdownMenuItem onClick={handleEdit}>
                        <Pen />
                        Edit
                        <DropdownMenuShortcut>⌘E</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleDuplicate}>
                        <Copy />
                        Duplicate
                        <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        variant="destructive"
                        onClick={() => setDeleteConfirmOpen(true)}
                    >
                        <Trash2 />
                        Delete
                        <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            <DeleteConfirmationDialog
                open={deleteConfirmOpen}
                onOpenChange={setDeleteConfirmOpen}
                onConfirm={handleDelete}
                description={`This will permanently delete ${itemName}. This action cannot be undone.`}
            />
        </>
    )
}
