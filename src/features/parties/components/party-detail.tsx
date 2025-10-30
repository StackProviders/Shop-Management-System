import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {
    Search,
    Printer,
    FileDown,
    Filter,
    MoreVertical,
    SquarePen
} from 'lucide-react'
import { Party } from '../types'
import { useIsMobile } from '@/hooks/use-mobile'
import { Heading4 } from '@/components/ui/typography'
import { DetailActionsMenu } from '@/components/detail-actions-menu'
import { usePartyMutations } from '@/features/parties'
import { Separator } from '@/components/ui/separator'

interface PartyDetailProps {
    party: Party
    onEdit: () => void
    shopId: string
}

export function PartyDetail({ party, onEdit, shopId }: PartyDetailProps) {
    const { deleteParty } = usePartyMutations(shopId)
    const isMobile = useIsMobile()
    const hasContactInfo = !!(
        party.contactInfo.phone ||
        party.contactInfo.email ||
        party.contactInfo.address
    )
    const showHeaderCard = !isMobile || hasContactInfo

    return (
        <Card className="rounded-sm">
            <CardContent className="space-y-2 sm:space-y-4">
                <div className="h-full flex flex-col gap-2">
                    {/* Header Card */}
                    {showHeaderCard && (
                        <>
                            <div className="flex items-center justify-between">
                                <Heading4 className="text-lg md:text-xl font-semibold">
                                    {isMobile ? 'Contact Info' : party.name}
                                </Heading4>
                                {!isMobile && (
                                    <div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={onEdit}
                                        >
                                            <SquarePen className="h-4 w-4 text-primary" />
                                        </Button>
                                        <DetailActionsMenu
                                            item={party}
                                            itemName={party.name}
                                            editPath={`/parties/${party.id}/edit`}
                                            duplicatePath="/parties/new"
                                            listPath="/parties"
                                            onDelete={deleteParty}
                                            getDuplicateData={(p) => ({
                                                type: p.type,
                                                name: `${p.name} (Copy)`,
                                                phone: p.contactInfo.phone,
                                                email: p.contactInfo.email,
                                                address: p.contactInfo.address,
                                                balance: 0,
                                                status: p.status
                                            })}
                                        />
                                    </div>
                                )}
                            </div>

                            {hasContactInfo && (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-sm">
                                    {party.contactInfo.phone && (
                                        <div>
                                            <div className="text-muted-foreground text-xs mb-1">
                                                Phone Number
                                            </div>
                                            <div className="text-primary font-medium">
                                                {party.contactInfo.phone}
                                            </div>
                                        </div>
                                    )}
                                    {party.contactInfo.email && (
                                        <div>
                                            <div className="text-muted-foreground text-xs mb-1">
                                                Email
                                            </div>
                                            <div className="text-primary font-medium break-all">
                                                {party.contactInfo.email}
                                            </div>
                                        </div>
                                    )}
                                    {party.contactInfo.address && (
                                        <div>
                                            <div className="text-muted-foreground text-xs mb-1">
                                                Billing Address
                                            </div>
                                            <div className="font-medium line-clamp-2">
                                                {party.contactInfo.address}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                    <Separator className="my-2" />

                    {/* Transactions Section */}
                    <div className="flex-1 overflow-hidden flex flex-col">
                        <div className="pb-2 flex items-center justify-between">
                            <h2 className="text-sm sm:text-base font-semibold">
                                Transactions
                            </h2>
                            <div className="flex gap-0.5 sm:gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 sm:h-8 sm:w-8"
                                >
                                    <Search className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 sm:h-8 sm:w-8"
                                >
                                    <Printer className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 sm:h-8 sm:w-8"
                                >
                                    <FileDown className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-success" />
                                </Button>
                            </div>
                        </div>

                        {/* Table */}
                        <ScrollArea className="flex-1">
                            <Table>
                                <TableHeader className="sticky top-0 bg-muted/50">
                                    <TableRow>
                                        <TableHead className="text-xs sm:text-sm">
                                            <div className="flex items-center gap-1">
                                                Type
                                                <Filter className="h-3 w-3" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="hidden md:table-cell text-xs sm:text-sm">
                                            <div className="flex items-center gap-1">
                                                Number
                                                <Filter className="h-3 w-3" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-xs sm:text-sm">
                                            <div className="flex items-center gap-1">
                                                Date
                                                <Filter className="h-3 w-3" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-right text-xs sm:text-sm">
                                            <div className="flex items-center justify-end gap-1">
                                                Total
                                                <Filter className="h-3 w-3" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-right text-xs sm:text-sm hidden sm:table-cell">
                                            <div className="flex items-center justify-end gap-1">
                                                Balance
                                                <Filter className="h-3 w-3" />
                                            </div>
                                        </TableHead>
                                        <TableHead className="w-8 sm:w-10"></TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="font-medium text-xs sm:text-sm">
                                            Payable Opening Balance
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-xs sm:text-sm"></TableCell>
                                        <TableCell className="text-xs sm:text-sm">
                                            23/10/2025
                                        </TableCell>
                                        <TableCell className="text-right text-destructive font-medium text-xs sm:text-sm">
                                            100.00 ৳
                                        </TableCell>
                                        <TableCell className="text-right text-destructive font-medium text-xs sm:text-sm hidden sm:table-cell">
                                            100.00 ৳
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 sm:h-8 sm:w-8"
                                                    >
                                                        <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium text-xs sm:text-sm">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-xs sm:text-sm">
                                            2
                                        </TableCell>
                                        <TableCell className="text-xs sm:text-sm">
                                            23/10/2025
                                        </TableCell>
                                        <TableCell className="text-right text-destructive font-medium text-xs sm:text-sm">
                                            100.00 ৳
                                        </TableCell>
                                        <TableCell className="text-right text-destructive font-medium text-xs sm:text-sm hidden sm:table-cell">
                                            100.00 ৳
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 sm:h-8 sm:w-8"
                                                    >
                                                        <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="font-medium text-xs sm:text-sm">
                                            Sale
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-xs sm:text-sm">
                                            3
                                        </TableCell>
                                        <TableCell className="text-xs sm:text-sm">
                                            23/10/2025
                                        </TableCell>
                                        <TableCell className="text-right text-destructive font-medium text-xs sm:text-sm">
                                            100.00 ৳
                                        </TableCell>
                                        <TableCell className="text-right font-medium text-xs sm:text-sm hidden sm:table-cell">
                                            0.00 ৳
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 sm:h-8 sm:w-8"
                                                    >
                                                        <MoreVertical className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem>
                                                        View
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        Edit
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="text-destructive">
                                                        Delete
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </ScrollArea>
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}
