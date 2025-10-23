export type PartyType = 'customer' | 'supplier'
export type PartyStatus = 'active' | 'inactive'

export interface PartyContactInfo {
    phone?: string
    email?: string
    address?: string
}

export interface Party {
    id: string
    shopId: string
    type: PartyType
    name: string
    contactInfo: PartyContactInfo
    balance: number
    status: PartyStatus
    createdAt: Date
    updatedAt: Date
}

export interface CreatePartyData {
    type: PartyType
    name: string
    contactInfo?: PartyContactInfo
    balance?: number
    status?: PartyStatus
}

export interface UpdatePartyData {
    name?: string
    contactInfo?: PartyContactInfo
    balance?: number
    status?: PartyStatus
}
