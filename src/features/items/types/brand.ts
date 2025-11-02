export interface Brand {
    id: string
    name: string
    logoUrl?: string
    shopId: string
    createdAt: Date
    updatedAt: Date
}

export interface CreateBrandData {
    name: string
    logoUrl?: string
}
