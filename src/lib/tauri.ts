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

export const getCustomToken = async (
    email: string,
    serviceAccountEmail: string,
    privateKey: string
): Promise<string> => {
    if (!email || !serviceAccountEmail || !privateKey) {
        throw new Error('Email and credentials must be provided')
    }

    if (!isTauri) {
        console.log('Mocking Custom Token fetch:', { email })
        return 'mock-custom-token-' + Date.now()
    }

    return await invoke('get_custom_token', {
        email,
        serviceAccountEmail,
        privateKey
    })
}
