export interface SerialNumber {
    id: string
    shopId: string
    itemId: string
    serialNo: string
    isSold: boolean
    soldAt?: Date
    createdAt: Date
    updatedAt: Date
}

export interface CreateSerialNumberData {
    serialNo: string
}
