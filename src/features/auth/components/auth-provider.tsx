import {
    createContext,
    useContext,
    useEffect,
    ReactNode,
    useState
} from 'react'
import { useUser, useAuth as useFirebaseAuth, useFirestore } from 'reactfire'
import {
    doc,
    setDoc,
    serverTimestamp,
    onSnapshot,
    DocumentSnapshot
} from 'firebase/firestore'
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
        let unsubscribe: () => void
        let timeoutId: NodeJS.Timeout

        async function syncUser() {
            if (!firebaseUser) {
                setUserProfile(null)
                return
            }

            setSyncing(true)

            // Set a timeout to stop loading if we're offline/slow
            timeoutId = setTimeout(() => {
                console.warn('User sync timed out, assuming offline/uncached')
                setSyncing(false)
            }, 2000)

            try {
                const userRef = doc(firestore, 'users', firebaseUser.uid)

                unsubscribe = onSnapshot(
                    userRef,
                    { includeMetadataChanges: true },
                    async (userSnap: DocumentSnapshot) => {
                        // Clear timeout once we get data
                        clearTimeout(timeoutId)

                        if (!userSnap.exists()) {
                            // Resolve email: try firebaseUser.email, then check if uid looks like an email, then check providers
                            const resolvedEmail =
                                firebaseUser.email ||
                                (firebaseUser.uid.includes('@')
                                    ? firebaseUser.uid
                                    : null) ||
                                firebaseUser.providerData.find((p) => p.email)
                                    ?.email ||
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
                            try {
                                await setDoc(userRef, {
                                    ...newUser,
                                    providers: firebaseUser.providerData.map(
                                        (p) => ({
                                            providerId: p.providerId,
                                            uid: p.uid,
                                            displayName: p.displayName || null,
                                            email: p.email || null,
                                            phoneNumber: p.phoneNumber || null,
                                            photoURL: p.photoURL || null
                                        })
                                    ),
                                    createdAt: serverTimestamp(),
                                    lastLoginAt: serverTimestamp()
                                })
                                setUserProfile(newUser)
                            } catch (error) {
                                console.error(
                                    'Error creating user profile:',
                                    error
                                )
                                // Even if creation fails (e.g. offline), set the local profile so app can load
                                setUserProfile(newUser)
                            }
                        } else {
                            // Resolve email for update as well
                            const resolvedEmail =
                                firebaseUser.email ||
                                (firebaseUser.uid.includes('@')
                                    ? firebaseUser.uid
                                    : null) ||
                                firebaseUser.providerData.find((p) => p.email)
                                    ?.email ||
                                null

                            // Update last login and providers
                            // Don't await this if we want to be fast, or wrap in try-catch for offline
                            setDoc(
                                userRef,
                                {
                                    lastLoginAt: serverTimestamp(),
                                    // Also update email if it was missing but we found it now
                                    ...(resolvedEmail
                                        ? { email: resolvedEmail }
                                        : {}),
                                    providers: firebaseUser.providerData.map(
                                        (p) => ({
                                            providerId: p.providerId,
                                            uid: p.uid,
                                            displayName: p.displayName || null,
                                            email: p.email || null,
                                            phoneNumber: p.phoneNumber || null,
                                            photoURL: p.photoURL || null
                                        })
                                    )
                                },
                                { merge: true }
                            ).catch((e) =>
                                console.error('Error updating user stats:', e)
                            )

                            const data = userSnap.data()
                            setUserProfile({
                                uid: firebaseUser.uid,
                                email: data.email || resolvedEmail,
                                phone:
                                    firebaseUser.phoneNumber ||
                                    data.phone ||
                                    null,
                                name:
                                    data.name ||
                                    firebaseUser.displayName ||
                                    null,
                                photo:
                                    data.photo || firebaseUser.photoURL || null,
                                createdAt:
                                    data.createdAt?.toDate() || new Date(),
                                lastLoginAt:
                                    data.lastLoginAt?.toDate() || new Date()
                            })
                        }
                        setSyncing(false)
                    },
                    (error: Error) => {
                        console.error('Error syncing user snapshot:', error)
                        clearTimeout(timeoutId)
                        setSyncing(false)
                    }
                )
            } catch (error) {
                console.error('Error setting up user sync:', error)
                clearTimeout(timeoutId)
                setSyncing(false)
            }
        }

        if (status === 'success') {
            syncUser()
        }

        return () => {
            if (unsubscribe) unsubscribe()
            if (timeoutId) clearTimeout(timeoutId)
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
