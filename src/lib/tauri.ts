import { invoke } from '@tauri-apps/api/core'

const isTauri = typeof window !== 'undefined' && '__TAURI__' in window

export const sendSMS = async (
    apiKey: string,
    phoneNumber: string,
    message: string
): Promise<void> => {
    // Ensure apiKey, phoneNumber, and message are not empty
    if (!apiKey || !phoneNumber || !message) {
        throw new Error('All parameters must be non-empty strings')
    }

    if (!isTauri) {
        console.log('Mocking SMS send:', { apiKey, phoneNumber, message })
        return
    }

    await invoke('send_sms', { apiKey, phoneNumber, message })
}

export const sendEmail = async (
    apiKey: string,
    toEmail: string,
    subject: string,
    html: string
): Promise<void> => {
    // Ensure apiKey, toEmail, subject, and html are not empty
    if (!apiKey || !toEmail || !subject || !html) {
        throw new Error('All parameters must be non-empty strings')
    }

    if (!isTauri) {
        console.log('Mocking Email send:', { apiKey, toEmail, subject, html })
        return
    }

    await invoke('send_email', { apiKey, toEmail, subject, html })
}
