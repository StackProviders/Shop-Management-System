import { useIsMobile } from '@/hooks/use-mobile'
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle
} from '@/components/ui/sheet'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Edit, Trash2, Phone, Mail, MapPin } from 'lucide-react'
import { Party } from '../types'
import { formatCurrency } from '@/features/shared'

interface PartyDetailsModalProps {
    party: Party | null
    open: boolean
    onOpenChange: (open: boolean) => void
    onEdit: () => void
    onDelete: () => void
}

export function PartyDetailsModal({
    party,
    open,
    onOpenChange,
    onEdit,
    onDelete
}: PartyDetailsModalProps) {
    const isMobile = useIsMobile()

    const content = party ? (
        <div className="space-y-6">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold">{party.name}</h2>
                    <div className="flex gap-2 mt-2">
                        <Badge
                            variant={
                                party.type === 'customer'
                                    ? 'primary'
                                    : 'secondary'
                            }
                        >
                            {party.type}
                        </Badge>
                        <Badge
                            variant={
                                party.status === 'active'
                                    ? 'success'
                                    : 'outline'
                            }
                        >
                            {party.status}
                        </Badge>
                    </div>
                </div>
            </div>

            <Separator />

            <div className="space-y-4">
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Balance
                    </h3>
                    <p className="text-2xl font-bold">
                        {formatCurrency(party.balance)}
                    </p>
                </div>

                {party.contactInfo.phone && (
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                            Phone
                        </h3>
                        <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <p>{party.contactInfo.phone}</p>
                        </div>
                    </div>
                )}

                {party.contactInfo.email && (
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                            Email
                        </h3>
                        <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-muted-foreground" />
                            <p>{party.contactInfo.email}</p>
                        </div>
                    </div>
                )}

                {party.contactInfo.address && (
                    <div>
                        <h3 className="text-sm font-medium text-muted-foreground mb-1">
                            Address
                        </h3>
                        <div className="flex items-start gap-2">
                            <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <p className="text-sm">
                                {party.contactInfo.address}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <Separator />

            <div className="flex gap-2">
                <Button onClick={onEdit} className="flex-1">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                </Button>
                <Button
                    onClick={onDelete}
                    variant="destructive"
                    className="flex-1"
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete
                </Button>
            </div>
        </div>
    ) : (
        <div className="space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
        </div>
    )

    if (isMobile) {
        return (
            <Sheet open={open} onOpenChange={onOpenChange}>
                <SheetContent
                    side="bottom"
                    className="h-[85vh] overflow-y-auto"
                >
                    <SheetHeader>
                        <SheetTitle>Party Details</SheetTitle>
                    </SheetHeader>
                    <div className="mt-6">{content}</div>
                </SheetContent>
            </Sheet>
        )
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>Party Details</DialogTitle>
                </DialogHeader>
                {content}
            </DialogContent>
        </Dialog>
    )
}
