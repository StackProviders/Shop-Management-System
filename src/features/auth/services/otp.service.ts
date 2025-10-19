import { otpsRepo } from '@/lib/db'
import { generateOTP, hashString } from './utils'
import { OTP_EXPIRY_MINUTES } from './constants'
import { sendSMS, sendEmail } from '@/lib/tauri'

export const sendOTP = async (
    identifier: string,
    uid: string
): Promise<void> => {
    const otp = generateOTP()
    const otpHash = await hashString(otp)
    const now = new Date()

    await otpsRepo.set({
        id: crypto.randomUUID(),
        userId: uid,
        code: otpHash,
        expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000),
        verified: false,
        createdAt: now
    })

    const isEmail = identifier.includes('@')
    const apiKey = isEmail
        ? import.meta.env.VITE_EMAIL_API_KEY
        : import.meta.env.VITE_SMS_API_KEY
    if (!apiKey)
        throw new Error(`${isEmail ? 'Email' : 'SMS'} API key not configured`)

    if (isEmail) {
        await sendEmail(
            apiKey,
            identifier,
            'Your OTP Code',
            `<p>Your OTP is: <strong>${otp}</strong></p><p>Valid for ${OTP_EXPIRY_MINUTES} minutes.</p>`
        )
    } else {
        await sendSMS(
            apiKey,
            identifier,
            `Your OTP is: ${otp}. Valid for ${OTP_EXPIRY_MINUTES} minutes.`
        )
    }
}

export const verifyOTP = async (uid: string, otp: string): Promise<void> => {
    const otps = await otpsRepo.list()
    const now = new Date()
    const userOtps = otps
        .filter((o) => o.userId === uid && !o.verified)
        .sort(
            (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
        )

    if (userOtps.length === 0) throw new Error('Invalid OTP')

    const cleanOtp = otp.trim()
    const otpHash = await hashString(cleanOtp)
    const otpData = userOtps.find((o) => o.code === otpHash)

    if (!otpData) throw new Error('Invalid OTP')
    if (now > new Date(otpData.expiresAt)) throw new Error('OTP expired')

    await otpsRepo.set({ ...otpData, verified: true })
}
