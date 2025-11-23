import { Button } from '@/components/ui/button'
import { SquarePen } from 'lucide-react'
import { Party } from '../types'
import { useIsMobile } from '@/hooks/use-mobile'
import { usePartyMutations } from '@/features/parties'
import {
    ListDetailContentHeader,
    ListDetailContentHeaderTitle,
    ListDetailContentHeaderInfo,
    ListDetailContentHeaderInfoItem,
    ListDetailContentBody
} from '@/components/ui/list-detail-layout'
import { useRouter } from 'next/navigation'
import { DetailActionsMenu } from '@/components'

interface PartyDetailProps {
    party: Party
    onEdit?: () => void
    shopId: string
}

export function PartyDetail({ party, shopId }: PartyDetailProps) {
    const router = useRouter()
    const { deleteParty } = usePartyMutations(shopId)
    const isMobile = useIsMobile()
    const hasContactInfo = !!(
        party.contactInfo.phone ||
        party.contactInfo.email ||
        party.contactInfo.address
    )

    const handleEdit = () => {
        router.push(`/parties/${party.id}/edit?fromDetail=true`)
    }

    return (
        <>
            {/* Header Card */}
            {(hasContactInfo || !isMobile) && (
                <ListDetailContentHeader>
                    <ListDetailContentHeaderTitle>
                        <h2 className="text-lg md:text-xl font-semibold">
                            {isMobile ? 'Contact Info' : party.name}
                        </h2>
                        {!isMobile && (
                            <div className="flex items-center gap-1">
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={handleEdit}
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
                                    onEditClick={handleEdit}
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
                    </ListDetailContentHeaderTitle>

                    {hasContactInfo && (
                        <ListDetailContentHeaderInfo>
                            {party.contactInfo.phone && (
                                <ListDetailContentHeaderInfoItem
                                    label="Phone Number"
                                    value={party.contactInfo.phone}
                                />
                            )}
                            {party.contactInfo.email && (
                                <ListDetailContentHeaderInfoItem
                                    label="Email"
                                    value={party.contactInfo.email}
                                />
                            )}
                            {party.contactInfo.address && (
                                <ListDetailContentHeaderInfoItem
                                    label="Billing Address"
                                    value={party.contactInfo.address}
                                />
                            )}
                        </ListDetailContentHeaderInfo>
                    )}
                </ListDetailContentHeader>
            )}

            {/* Transactions Section */}
            <ListDetailContentBody>
                <h2 className="text-sm sm:text-base font-semibold mb-2">
                    Transactions
                </h2>
                <p className="text-sm text-center text-muted-foreground">
                    This feature is coming soon.
                </p>
            </ListDetailContentBody>
        </>
    )
}
