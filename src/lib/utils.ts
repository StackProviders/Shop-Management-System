import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merges Tailwind class names, resolving any conflicts.
 *
 * @param inputs - An array of class names to merge.
 * @returns A string of merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}

/**
 * Formats a number as a currency string with TK symbol.
 *
 * @param amount - The number to format.
 * @returns A formatted currency string with TK symbol.
 */
export function formatCurrency(amount: number): string {
    return 'TK ' + new Intl.NumberFormat('en-IN').format(amount)
}

/**
 * Formats a date string into a localized date string.
 *
 * @param dateString - The date string to format.
 * @returns A formatted date string.
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium'
    }).format(date)
}
