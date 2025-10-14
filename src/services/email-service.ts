import { invoke } from '@tauri-apps/api/core'
import { renderOTPEmail } from '@/emails/otp-email'

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY || ''

export const sendOTPEmail = async (
    email: string,
    otp: string
): Promise<void> => {
    // Always log OTP for development
    console.log(`\n🔐 OTP for ${email}: ${otp}\n`)

    if (!RESEND_API_KEY) {
        console.warn(
            '⚠️ Resend API key not configured - OTP shown in console only'
        )
        return
    }

    const html = await renderOTPEmail(otp)

    await invoke('send_email', {
        apiKey: RESEND_API_KEY,
        toEmail: email,
        subject: 'Your Login Verification Code - Shop Management',
        html
    })

    console.log('✅ Email sent successfully to', email)
}
