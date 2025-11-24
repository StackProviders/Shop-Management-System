import {
    createContext,
    useContext,
    useEffect,
    ReactNode,
    useState
} from 'react'
import { useUser, useAuth as useFirebaseAuth, useFirestore } from 'reactfire'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'
import { signOut as firebaseSignOut } from 'firebase/auth'
import type { User } from '../types'

interface AuthContextValue {
    user: User | null
    loading: boolean
    isAuthenticated: boolean
    signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
    const { data: firebaseUser, status } = useUser()
    const auth = useFirebaseAuth()
    const firestore = useFirestore()
    const [userProfile, setUserProfile] = useState<User | null>(null)
    const [syncing, setSyncing] = useState(false)

    useEffect(() => {
        async function syncUser() {
            if (!firebaseUser) {
                setUserProfile(null)
                return
            }

            setSyncing(true)
            try {
                const userRef = doc(firestore, 'users', firebaseUser.uid)
                const userSnap = await getDoc(userRef)

                if (!userSnap.exists()) {
                    // Resolve email: try firebaseUser.email, then check if uid looks like an email, then check providers
                    const resolvedEmail =
                        firebaseUser.email ||
                        (firebaseUser.uid.includes('@')
                            ? firebaseUser.uid
                            : null) ||
                        firebaseUser.providerData.find((p) => p.email)?.email ||
                        null

                    const newUser: User = {
                        uid: firebaseUser.uid,
                        email: resolvedEmail,
                        phone: firebaseUser.phoneNumber || null,
                        name: firebaseUser.displayName || null,
                        photo: firebaseUser.photoURL || null,
                        createdAt: new Date(),
                        lastLoginAt: new Date()
                    }

                    // We need to convert Dates to Firestore Timestamps or ISO strings if we want to store them
                    // But for now let's just store them as is, Firestore SDK handles Dates usually
                    await setDoc(userRef, {
                        ...newUser,
                        providers: firebaseUser.providerData.map((p) => ({
                            providerId: p.providerId,
                            uid: p.uid,
                            displayName: p.displayName || null,
                            email: p.email || null,
                            phoneNumber: p.phoneNumber || null,
                            photoURL: p.photoURL || null
                        })),
                        createdAt: serverTimestamp(),
                        lastLoginAt: serverTimestamp()
                    })
                    setUserProfile(newUser)
                } else {
                    // Resolve email for update as well
                    const resolvedEmail =
                        firebaseUser.email ||
                        (firebaseUser.uid.includes('@')
                            ? firebaseUser.uid
                            : null) ||
                        firebaseUser.providerData.find((p) => p.email)?.email ||
                        null

                    // Update last login and providers
                    await setDoc(
                        userRef,
                        {
                            lastLoginAt: serverTimestamp(),
                            // Also update email if it was missing but we found it now
                            ...(resolvedEmail ? { email: resolvedEmail } : {}),
                            providers: firebaseUser.providerData.map((p) => ({
                                providerId: p.providerId,
                                uid: p.uid,
                                displayName: p.displayName || null,
                                email: p.email || null,
                                phoneNumber: p.phoneNumber || null,
                                photoURL: p.photoURL || null
                            }))
                        },
                        { merge: true }
                    )

                    const data = userSnap.data()
                    setUserProfile({
                        uid: firebaseUser.uid,
                        email: data.email || resolvedEmail,
                        phone: firebaseUser.phoneNumber || data.phone || null,
                        name: data.name || firebaseUser.displayName || null,
                        photo: data.photo || firebaseUser.photoURL || null,
                        createdAt: data.createdAt?.toDate() || new Date(),
                        lastLoginAt: data.lastLoginAt?.toDate() || new Date()
                    })
                }
            } catch (error) {
                console.error('Error syncing user:', error)
            } finally {
                setSyncing(false)
            }
        }

        if (status === 'success') {
            syncUser()
        }
    }, [firebaseUser, status, firestore])

    const signOut = async () => {
        await firebaseSignOut(auth)
        setUserProfile(null)
    }

    const value = {
        user: userProfile,
        loading: status === 'loading' || syncing,
        isAuthenticated: !!firebaseUser,
        signOut
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}
