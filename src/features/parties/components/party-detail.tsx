import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Pencil, Trash2, Phone, Mail, MapPin } from 'lucide-react'
import { Party } from '../types'

interface PartyDetailProps {
    party: Party
    onEdit: () => void
    onDelete: () => void
}

export function PartyDetail({ party, onEdit, onDelete }: PartyDetailProps) {
    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-2xl font-bold">{party.name}</h2>
                        <Pencil
                            className="w-4 h-4 text-blue-600 cursor-pointer"
                            onClick={onEdit}
                        />
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                        <Badge
                            variant={
                                party.type === 'customer'
                                    ? 'default'
                                    : 'secondary'
                            }
                        >
                            {party.type}
                        </Badge>
                        <Badge
                            variant={
                                party.status === 'active'
                                    ? 'default'
                                    : 'secondary'
                            }
                        >
                            {party.status}
                        </Badge>
                    </div>
                </div>
            </div>

            <Card className="p-4 space-y-3">
                {party.contactInfo.phone && (
                    <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Phone Number</span>
                        <span className="ml-auto font-medium">
                            {party.contactInfo.phone}
                        </span>
                    </div>
                )}

                {party.contactInfo.email && (
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Email</span>
                        <span className="ml-auto font-medium text-sm">
                            {party.contactInfo.email}
                        </span>
                    </div>
                )}

                {party.contactInfo.address && (
                    <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                        <span className="text-sm">Billing Address</span>
                        <span className="ml-auto font-medium text-sm text-right">
                            {party.contactInfo.address}
                        </span>
                    </div>
                )}
            </Card>

            <div>
                <h3 className="text-lg font-semibold mb-2">Transactions</h3>
                <Card className="p-4">
                    <p className="text-sm text-muted-foreground">
                        No transactions yet
                    </p>
                </Card>
            </div>
        </div>
    )
}
