import { otpRequestsRepo } from '@/lib/db'
import type { OTPRequestData } from '@/lib/db'
import { generateOTP, hashString } from './utils'
import { OTP_EXPIRY_MINUTES, OTP_MAX_ATTEMPTS } from './constants'
import { sendSMS, sendEmail } from '@/lib/tauri'

export const sendOTP = async (
    identifier: string,
    uid: string
): Promise<void> => {
    const otp = generateOTP()
    const otpHash = await hashString(otp)
    const now = new Date()

    const otpRequest: OTPRequestData & { id: string } = {
        id: uid,
        otpHash,
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
        attempts: 0,
        createdAt: now
    }

    await otpRequestsRepo.set(otpRequest)

    const isEmail = identifier.includes('@')

    if (isEmail) {
        const apiKey = import.meta.env.VITE_EMAIL_API_KEY
        if (!apiKey) throw new Error('Email API key not configured')

        await sendEmail(
            apiKey,
            identifier,
            'Your OTP Code',
            `<p>Your OTP is: <strong>${otp}</strong></p><p>Valid for ${OTP_EXPIRY_MINUTES} minutes.</p>`
        )
    } else {
        const apiKey = import.meta.env.VITE_SMS_API_KEY
        if (!apiKey) throw new Error('SMS API key not configured')

        await sendSMS(
            apiKey,
            identifier,
            `Your OTP is: ${otp}. Valid for ${OTP_EXPIRY_MINUTES} minutes.`
        )
    }
}

export const verifyOTP = async (uid: string, otp: string): Promise<void> => {
    const otpData = await otpRequestsRepo.get({ id: uid })

    if (!otpData) throw new Error('Invalid OTP')

    if (otpData.attempts >= OTP_MAX_ATTEMPTS)
        throw new Error('Too many attempts')

    const otpHash = await hashString(otp)
    if (otpData.otpHash !== otpHash) {
        await otpRequestsRepo.set({
            ...otpData,
            attempts: otpData.attempts + 1
        })
        throw new Error('Invalid OTP')
    }

    const expiresAt =
        otpData.expiresAt instanceof Date
            ? otpData.expiresAt
            : new Date(otpData.expiresAt)
    if (new Date() > expiresAt) throw new Error('OTP expired')

    await otpRequestsRepo.delete({ id: uid })
}
