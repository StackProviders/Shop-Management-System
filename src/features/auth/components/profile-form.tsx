'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { useAuth } from './auth-provider'
import { useFirestore, useStorage } from 'reactfire'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { updateProfile as updateFirebaseProfile } from 'firebase/auth'
import { useAuth as useFirebaseAuth } from 'reactfire'

export function ProfileForm() {
    const { user } = useAuth()
    const firestore = useFirestore()
    const storage = useStorage()
    const auth = useFirebaseAuth()

    const [name, setName] = useState('')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (user?.name) {
            setName(user.name)
        }
    }, [user])

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!user) return

        setLoading(true)
        setError('')
        setSuccess('')
        try {
            // Update Firestore
            const userRef = doc(firestore, 'users', user.uid)
            await updateDoc(userRef, { name })

            // Update Firebase Auth Profile (optional but good for consistency)
            if (auth.currentUser) {
                await updateFirebaseProfile(auth.currentUser, {
                    displayName: name
                })
            }

            setSuccess('Profile updated!')
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to update profile'
            )
        } finally {
            setLoading(false)
        }
    }

    const handlePhotoUpload = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0]
        if (!file || !user) return

        setLoading(true)
        setError('')
        setSuccess('')
        try {
            const storageRef = ref(storage, `users/${user.uid}/photo.jpg`)
            await uploadBytes(storageRef, file)
            const photoURL = await getDownloadURL(storageRef)

            // Update Firestore
            const userRef = doc(firestore, 'users', user.uid)
            await updateDoc(userRef, { photo: photoURL })

            // Update Firebase Auth Profile
            if (auth.currentUser) {
                await updateFirebaseProfile(auth.currentUser, { photoURL })
            }

            setSuccess('Photo uploaded!')
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to upload photo'
            )
        } finally {
            setLoading(false)
        }
    }

    if (!user) return null

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle>Profile</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleUpdateProfile}>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="name">Name</FieldLabel>
                                <Input
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Field>
                            <Field>
                                <FieldLabel htmlFor="photo">Photo</FieldLabel>
                                <Input
                                    id="photo"
                                    type="file"
                                    accept="image/*"
                                    onChange={handlePhotoUpload}
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    {success && (
                        <Alert className="mt-4">
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}
                    {error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" className="mt-4" disabled={loading}>
                        {loading && (
                            <Loader2 className="mr-2 size-4 animate-spin" />
                        )}
                        Update Profile
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
