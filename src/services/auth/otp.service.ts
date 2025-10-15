import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    Timestamp
} from 'firebase/firestore'
import { db } from '@/lib/firebase'
import { generateOTP, hashString } from './utils'
import { COLLECTIONS, OTP_EXPIRY_MINUTES, OTP_MAX_ATTEMPTS } from './constants'
import { sendSMS, sendEmail } from '@/lib/tauri'

export const sendOTP = async (
    identifier: string,
    uid: string
): Promise<void> => {
    const otp = generateOTP()
    const otpHash = await hashString(otp)

    await setDoc(doc(db, COLLECTIONS.OTP_REQUESTS, uid), {
        otpHash,
        expiresAt: Timestamp.fromDate(
            new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000)
        ),
        attempts: 0,
        createdAt: Timestamp.now()
    })

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
    const otpDoc = await getDoc(doc(db, COLLECTIONS.OTP_REQUESTS, uid))

    if (!otpDoc.exists()) throw new Error('Invalid OTP')

    const otpData = otpDoc.data()
    if (otpData.attempts >= OTP_MAX_ATTEMPTS)
        throw new Error('Too many attempts')

    const otpHash = await hashString(otp)
    if (otpData.otpHash !== otpHash) {
        await updateDoc(doc(db, COLLECTIONS.OTP_REQUESTS, uid), {
            attempts: otpData.attempts + 1
        })
        throw new Error('Invalid OTP')
    }

    if (new Date() > otpData.expiresAt.toDate()) throw new Error('OTP expired')

    await deleteDoc(doc(db, COLLECTIONS.OTP_REQUESTS, uid))
}
