import {
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
    User as FirebaseUser
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { User } from '@/types/auth'
import { sendOTPEmail } from './email-service'

const googleProvider = new GoogleAuthProvider()

// Store OTP and email temporarily with expiration
const otpStore = new Map<
    string,
    { otp: string; expires: number; email: string }
>()

export const sendOTP = async (email: string): Promise<void> => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expires = Date.now() + 10 * 60 * 1000 // 10 minutes

    otpStore.set(email, { otp, expires, email })

    try {
        await sendOTPEmail(email, otp)
    } catch (error) {
        console.error('Failed to send OTP email:', error)
        const errorMessage =
            error instanceof Error ? error.toString() : 'Unknown error'

        if (errorMessage.includes('Network error')) {
            throw new Error(
                'Network error. Please check your internet connection and try again.'
            )
        } else if (errorMessage.includes('Email service error')) {
            throw new Error(
                'Unable to send email. Please verify your email address or try again later.'
            )
        } else {
            throw new Error(
                'Failed to send verification code. Please try again.'
            )
        }
    }
}

export const verifyOTP = async (email: string, otp: string): Promise<User> => {
    const stored = otpStore.get(email)

    if (!stored || stored.otp !== otp) {
        throw new Error('Invalid OTP. Please check the code and try again.')
    }

    if (Date.now() > stored.expires) {
        otpStore.delete(email)
        throw new Error('OTP has expired. Please request a new code.')
    }

    otpStore.delete(email)

    try {
        // Check if user exists in Firestore
        const usersQuery = await getDoc(doc(db, 'users', email))
        const userExists = usersQuery.exists()

        // Create a passwordless session using email as identifier
        // Store user session in Firestore
        const userData: User = {
            uid: email.replace(/[^a-zA-Z0-9]/g, '_'), // Safe UID from email
            email,
            emailVerified: true,
            createdAt: userExists ? usersQuery.data().createdAt : new Date(),
            updatedAt: new Date()
        }

        // Save to Firestore
        await setDoc(doc(db, 'users', email), userData, { merge: true })

        // Store in localStorage for persistence across app restarts
        localStorage.setItem('auth_user', JSON.stringify(userData))

        console.log(
            userExists
                ? '✅ User logged in'
                : '✅ New user created and logged in'
        )

        return userData
    } catch (error) {
        console.error('Error verifying OTP:', error)
        throw new Error('Authentication failed. Please try again.')
    }
}

export const loginWithGoogle = async (): Promise<User> => {
    try {
        const result = await signInWithPopup(auth, googleProvider)
        const firebaseUser = result.user
        const userDoc = await createOrUpdateUser(firebaseUser)
        return userDoc
    } catch (error) {
        console.error('Error logging in with Google:', error)
        throw new Error('Failed to login with Google')
    }
}

export const logout = async (): Promise<void> => {
    try {
        localStorage.removeItem('auth_user')
        await signOut(auth)
    } catch (error) {
        console.error('Error logging out:', error)
        throw new Error('Failed to logout')
    }
}

export const getCurrentUser = async (): Promise<User | null> => {
    // Check localStorage for passwordless auth (offline support)
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
        try {
            return JSON.parse(storedUser)
        } catch {
            localStorage.removeItem('auth_user')
        }
    }

    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            unsubscribe()
            if (firebaseUser) {
                try {
                    const userDoc = await createOrUpdateUser(firebaseUser)
                    localStorage.setItem('auth_user', JSON.stringify(userDoc))
                    resolve(userDoc)
                } catch (error) {
                    console.error('Error getting current user:', error)
                    resolve(null)
                }
            } else {
                resolve(null)
            }
        })
    })
}

export const createOrUpdateUser = async (
    firebaseUser: FirebaseUser
): Promise<User> => {
    const userRef = doc(db, 'users', firebaseUser.uid)
    const userSnap = await getDoc(userRef)

    const userData: User = {
        uid: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName || undefined,
        photoURL: firebaseUser.photoURL || undefined,
        emailVerified: firebaseUser.emailVerified,
        createdAt: userSnap.exists() ? userSnap.data().createdAt : new Date(),
        updatedAt: new Date()
    }

    await setDoc(userRef, userData, { merge: true })
    localStorage.setItem('auth_user', JSON.stringify(userData))
    return userData
}

export const onAuthStateChange = (
    callback: (user: User | null) => void
): (() => void) => {
    // Check for passwordless session first (offline support)
    const storedUser = localStorage.getItem('auth_user')
    if (storedUser) {
        try {
            callback(JSON.parse(storedUser))
        } catch {
            localStorage.removeItem('auth_user')
        }
    }

    return onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
            try {
                const userDoc = await createOrUpdateUser(firebaseUser)
                localStorage.setItem('auth_user', JSON.stringify(userDoc))
                callback(userDoc)
            } catch (error) {
                console.error('Error in auth state change:', error)
                // Still use cached user if available (offline mode)
                const cached = localStorage.getItem('auth_user')
                if (cached) {
                    try {
                        callback(JSON.parse(cached))
                    } catch {
                        callback(null)
                    }
                } else {
                    callback(null)
                }
            }
        } else {
            // Check localStorage again for offline mode
            const stored = localStorage.getItem('auth_user')
            if (stored) {
                try {
                    callback(JSON.parse(stored))
                } catch {
                    callback(null)
                }
            } else {
                callback(null)
            }
        }
    })
}
