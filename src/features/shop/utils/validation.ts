import { CreateShopData } from '../types'

export function validateShopData(data: CreateShopData): string[] {
    const errors: string[] = []

    if (!data.shopname || data.shopname.trim().length === 0) {
        errors.push('Shop name is required')
    }

    if (data.shopname && data.shopname.length > 100) {
        errors.push('Shop name must be less than 100 characters')
    }

    if (data.email && !isValidEmail(data.email)) {
        errors.push('Invalid email address')
    }

    if (data.phone_number && !isValidPhone(data.phone_number)) {
        errors.push('Invalid phone number')
    }

    return errors
}

function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

function isValidPhone(phone: string): boolean {
    const phoneRegex = /^\+?[\d\s-()]+$/
    return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10
}
