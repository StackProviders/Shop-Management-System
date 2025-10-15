import React, { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, Mail, Phone } from 'lucide-react'

interface AuthFormProps {
    onSuccess?: () => void
}

type LoginType = 'email' | 'phone'
type Step = 'input' | 'verify'

export function LoginForm({ onSuccess }: AuthFormProps) {
    const [loginType, setLoginType] = useState<LoginType>('email')
    const [step, setStep] = useState<Step>('input')
    const [identifier, setIdentifier] = useState('')
    const [otp, setOtp] = useState('')
    const [trustDevice, setTrustDevice] = useState(false)
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)
    const { sendOTP, verifyOTP, authState } = useAuth()

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await sendOTP(identifier, loginType)
            setSuccess('OTP sent successfully!')
            setStep('verify')
        } catch (error) {
            console.error('Failed to send OTP:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await verifyOTP(identifier, otp, trustDevice)
            onSuccess?.()
        } catch (error) {
            console.error('OTP verification failed:', error)
        } finally {
            setLoading(false)
        }
    }

    if (step === 'verify') {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <CardTitle>Verify OTP</CardTitle>
                    <CardDescription>
                        Enter the 6-digit code sent to {identifier}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleVerifyOTP}>
                        <FieldSet>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="otp">
                                        OTP Code
                                    </FieldLabel>
                                    <Input
                                        id="otp"
                                        type="text"
                                        maxLength={6}
                                        value={otp}
                                        onChange={(e) => setOtp(e.target.value)}
                                        required
                                    />
                                </Field>
                            </FieldGroup>
                        </FieldSet>
                        <div className="flex items-center space-x-2 mt-4">
                            <Checkbox
                                id="trust"
                                checked={trustDevice}
                                onCheckedChange={(checked) =>
                                    setTrustDevice(checked as boolean)
                                }
                            />
                            <label
                                htmlFor="trust"
                                className="text-sm cursor-pointer"
                            >
                                Trust this device for 30 days
                            </label>
                        </div>
                        {authState.error && (
                            <Alert variant="destructive" className="mt-4">
                                <AlertDescription>
                                    {authState.error}
                                </AlertDescription>
                            </Alert>
                        )}
                        <Button
                            type="submit"
                            className="w-full mt-4"
                            disabled={loading}
                        >
                            {loading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Verify & Login
                        </Button>
                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full mt-2"
                            onClick={() => setStep('input')}
                        >
                            Back
                        </Button>
                    </form>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
                <CardTitle>Welcome</CardTitle>
                <CardDescription>
                    Login with{' '}
                    {loginType === 'email' ? 'Email' : 'Phone Number'}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSendOTP}>
                    <FieldSet>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor="identifier">
                                    {loginType === 'email'
                                        ? 'Email'
                                        : 'Phone Number'}
                                </FieldLabel>
                                <Input
                                    id="identifier"
                                    type={
                                        loginType === 'email' ? 'email' : 'tel'
                                    }
                                    placeholder={
                                        loginType === 'email'
                                            ? 'your@email.com'
                                            : '+1234567890'
                                    }
                                    value={identifier}
                                    onChange={(e) =>
                                        setIdentifier(e.target.value)
                                    }
                                    required
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    {success && (
                        <Alert className="mt-4">
                            <AlertDescription>{success}</AlertDescription>
                        </Alert>
                    )}
                    {authState.error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertDescription>
                                {authState.error}
                            </AlertDescription>
                        </Alert>
                    )}
                    <Button
                        type="submit"
                        className="w-full mt-4"
                        disabled={loading}
                    >
                        {loading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {loginType === 'email' ? (
                            <Mail className="mr-2 h-4 w-4" />
                        ) : (
                            <Phone className="mr-2 h-4 w-4" />
                        )}
                        Login
                    </Button>
                    <Button
                        type="button"
                        variant="link"
                        className="w-full mt-2"
                        onClick={() =>
                            setLoginType(
                                loginType === 'email' ? 'phone' : 'email'
                            )
                        }
                    >
                        Switch to {loginType === 'email' ? 'Phone' : 'Email'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

export function ProfileForm() {
    const { authState, updateProfile, uploadPhoto } = useAuth()
    const [name, setName] = useState(authState.user?.name || '')
    const [success, setSuccess] = useState('')
    const [loading, setLoading] = useState(false)

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        try {
            await updateProfile(name)
            setSuccess('Profile updated!')
        } catch (error) {
            console.error('Failed to update profile:', error)
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
        try {
            await uploadPhoto(file)
            setSuccess('Photo uploaded!')
        } catch (error) {
            console.error('Failed to upload photo:', error)
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
                    {authState.error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertDescription>
                                {authState.error}
                            </AlertDescription>
                        </Alert>
                    )}
                    <Button type="submit" className="mt-4" disabled={loading}>
                        {loading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Update Profile
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
