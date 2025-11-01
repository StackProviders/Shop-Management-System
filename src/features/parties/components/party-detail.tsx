import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SquarePen } from 'lucide-react'
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
                    <h2 className="text-sm sm:text-base font-semibold">
                        Transactions
                    </h2>
                    <p className="text-sm text-center space-y-2 text-muted-foreground">
                        This feature is coming soon.
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}
