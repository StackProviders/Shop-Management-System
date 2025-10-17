import { invoke } from '@tauri-apps/api/core'

export const sendSMS = async (
    apiKey: string,
    phoneNumber: string,
    message: string
): Promise<void> => {
    // Ensure apiKey, phoneNumber, and message are not empty
    if (!apiKey || !phoneNumber || !message) {
        throw new Error('All parameters must be non-empty strings')
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
    await invoke('send_email', { apiKey, toEmail, subject, html })
}
