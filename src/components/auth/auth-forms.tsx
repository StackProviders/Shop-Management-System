import React, { useState, useEffect } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldDescription
} from '@/components/ui/field'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Mail, Phone, ArrowLeft } from 'lucide-react'
import Logo from '../logo'
import { PhoneInput } from '../ui/phone-input'
import { OTPInput } from './otp-input'
import { cn } from '@/lib/utils'
import { Alert, AlertDescription } from '../ui/alert'

interface AuthFormProps {
    onSuccess?: () => void
}

type LoginType = 'email' | 'phone'
type Step = 'input' | 'verify'

export function LoginForm({ onSuccess }: AuthFormProps) {
    const [loginType, setLoginType] = useState<LoginType>('email')
    const [step, setStep] = useState<Step>('input')
    const [identifier, setIdentifier] = useState('')
    const [loading, setLoading] = useState(false)
    const [fieldError, setFieldError] = useState('')
    const [otpError, setOtpError] = useState('')
    const { sendOTP, verifyOTP, authState, checkDeviceAndLogin } = useAuth()

    // Auto-redirect if already authenticated via trusted device
    useEffect(() => {
        if (authState.isAuthenticated && !authState.loading) {
            onSuccess?.()
        }
    }, [authState.isAuthenticated, authState.loading, onSuccess])

    // Show loading state during initial auth check
    if (authState.loading) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
        )
    }

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        setFieldError('')

        if (!identifier.trim()) {
            setFieldError(
                loginType === 'email'
                    ? 'Email address is required'
                    : 'Phone number is required'
            )
            return
        }

        setLoading(true)
        try {
            // Check if device is trusted first
            const user = await checkDeviceAndLogin(identifier)
            if (user) {
                onSuccess?.()
                return
            }

            // Device not trusted, send OTP
            await sendOTP(identifier, loginType)
            setStep('verify')
        } catch (error) {
            setFieldError(
                error instanceof Error
                    ? error.message
                    : 'Failed to send verification code'
            )
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOTP = async (otp: string) => {
        setOtpError('')
        setLoading(true)
        try {
            await verifyOTP(identifier, otp, true)
            onSuccess?.()
        } catch (error) {
            setOtpError(
                error instanceof Error
                    ? error.message
                    : 'Invalid verification code'
            )
        } finally {
            setLoading(false)
        }
    }

    const handleResendOTP = async () => {
        setOtpError('')
        try {
            await sendOTP(identifier, loginType)
        } catch (error) {
            setOtpError(
                error instanceof Error ? error.message : 'Failed to resend code'
            )
        }
    }

    if (step === 'verify') {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <Card className="w-full max-w-sm rounded-3xl md:rounded-4xl px-4 py-8 md:px-6 md:py-10">
                    <CardContent>
                        <div className="flex flex-col items-center space-y-5">
                            <div className="space-y-3 w-full">
                                <Logo size="md" showTagline />
                                <div className="text-center space-y-1">
                                    <p className="text-muted-foreground text-sm">
                                        We sent a code to
                                    </p>
                                    <p className="text-sm font-semibold">
                                        {identifier}
                                    </p>
                                </div>
                            </div>

                            <div className="w-full space-y-4">
                                <OTPInput
                                    onComplete={handleVerifyOTP}
                                    onManualSubmit={handleVerifyOTP}
                                    onResend={handleResendOTP}
                                    error={otpError}
                                    disabled={loading}
                                />
                            </div>

                            <Button
                                type="button"
                                variant="ghost"
                                className="w-full rounded-xl"
                                onClick={() => {
                                    setStep('input')
                                    setOtpError('')
                                    setFieldError('')
                                }}
                                disabled={loading}
                            >
                                <ArrowLeft className="h-4 w-4" />
                                Back to Login
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-4">
            <Card className="w-full max-w-sm rounded-3xl md:rounded-4xl px-4 py-8 md:px-6 md:py-10">
                <CardContent>
                    <form
                        onSubmit={handleSendOTP}
                        className="flex flex-col items-center space-y-5"
                    >
                        <Logo size="md" showTagline />

                        <FieldSet className="w-full">
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="identifier">
                                        {loginType === 'email'
                                            ? 'Email Address'
                                            : 'Phone Number'}
                                    </FieldLabel>
                                    {loginType === 'email' ? (
                                        <Input
                                            id="identifier"
                                            type="email"
                                            placeholder="you@example.com"
                                            className={cn(
                                                'rounded-xl',
                                                fieldError &&
                                                    'border-destructive focus-visible:ring-destructive'
                                            )}
                                            value={identifier}
                                            onChange={(e) => {
                                                setIdentifier(e.target.value)
                                                setFieldError('')
                                            }}
                                            required
                                        />
                                    ) : (
                                        <PhoneInput
                                            id="identifier"
                                            placeholder="Enter phone number"
                                            value={identifier}
                                            onChange={(value) => {
                                                setIdentifier(value)
                                                setFieldError('')
                                            }}
                                        />
                                    )}
                                    <FieldDescription
                                        className={
                                            fieldError ? 'text-destructive' : ''
                                        }
                                    >
                                        {fieldError ||
                                            "We'll send you a secure verification code"}
                                    </FieldDescription>
                                </Field>
                            </FieldGroup>
                        </FieldSet>

                        <div className="w-full space-y-2">
                            <Button
                                type="submit"
                                className="w-full rounded-xl"
                                size="lg"
                                disabled={loading || !identifier.trim()}
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : loginType === 'email' ? (
                                    <Mail className="h-4 w-4" />
                                ) : (
                                    <Phone className="h-4 w-4" />
                                )}
                                Continue
                            </Button>
                            <Button
                                type="button"
                                variant="link"
                                className="w-full text-sm text-muted-foreground hover:text-foreground"
                                onClick={() => {
                                    setLoginType(
                                        loginType === 'email'
                                            ? 'phone'
                                            : 'email'
                                    )
                                    setIdentifier('')
                                    setFieldError('')
                                }}
                                disabled={loading}
                            >
                                Use{' '}
                                {loginType === 'email'
                                    ? 'phone number'
                                    : 'email'}{' '}
                                instead
                            </Button>
                        </div>

                        <p className="text-center text-xs text-muted-foreground px-2">
                            By continuing, you agree to Stack Provider{' '}
                            <a
                                href="#"
                                className="underline hover:text-foreground transition-colors"
                            >
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a
                                href="#"
                                className="underline hover:text-foreground transition-colors"
                            >
                                Privacy Policy
                            </a>
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
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
