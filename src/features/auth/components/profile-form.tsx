import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2 } from 'lucide-react'
import { useAuthActions, useCurrentUser } from '../hooks'

export function ProfileForm() {
    const user = useCurrentUser()
    const { updateProfile, uploadPhoto } = useAuthActions()
    const [name, setName] = useState(user?.name || '')
    const [success, setSuccess] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setError('')
        setSuccess('')
        try {
            await updateProfile(name)
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
        if (!file) return
        setLoading(true)
        setError('')
        setSuccess('')
        try {
            await uploadPhoto(file)
            setSuccess('Photo uploaded!')
        } catch (err) {
            setError(
                err instanceof Error ? err.message : 'Failed to upload photo'
            )
        } finally {
            setLoading(false)
        }
    }

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
