export interface PaginationParams {
    page: number
    limit: number
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    hasMore: boolean
}

export interface ApiError {
    message: string
    code?: string
    details?: unknown
}

export interface AsyncResult<T> {
    data: T | null
    loading: boolean
    error: Error | null
}
