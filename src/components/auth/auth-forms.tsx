import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { useAuthStore } from '@/stores/auth-store'
import {
    saveLastLoginType,
    getLastLoginType
} from '@/services/auth/storage.service'
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
    const { lastLoginType, setLastLoginType } = useAuthStore()
    const [loginType, setLoginType] = useState<LoginType>(lastLoginType)
    const [step, setStep] = useState<Step>('input')
    const [identifier, setIdentifier] = useState('')
    const [loading, setLoading] = useState(false)
    const [fieldError, setFieldError] = useState('')
    const [otpError, setOtpError] = useState('')
    const { sendOTP, verifyOTP, authState, checkDeviceAndLogin } = useAuth()

    useEffect(() => {
        getLastLoginType().then((type) => {
            setLoginType(type)
            setLastLoginType(type)
        })
    }, [])

    useEffect(() => {
        if (authState.isAuthenticated && !authState.loading) {
            onSuccess?.()
        }
    }, [authState.isAuthenticated, authState.loading, onSuccess])

    const toggleLoginType = useCallback(() => {
        const newType = loginType === 'email' ? 'phone' : 'email'
        setLoginType(newType)
        setLastLoginType(newType)
        saveLastLoginType(newType)
        setIdentifier('')
        setFieldError('')
    }, [loginType, setLastLoginType])

    const handleSendOTP = useCallback(
        async (e: React.FormEvent) => {
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
                const user = await checkDeviceAndLogin(identifier)
                if (user) {
                    onSuccess?.()
                    return
                }

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
        },
        [identifier, loginType, checkDeviceAndLogin, sendOTP, onSuccess]
    )

    const handleVerifyOTP = useCallback(
        async (otp: string) => {
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
        },
        [identifier, verifyOTP, onSuccess]
    )

    const handleResendOTP = useCallback(async () => {
        setOtpError('')
        try {
            await sendOTP(identifier, loginType)
        } catch (error) {
            setOtpError(
                error instanceof Error ? error.message : 'Failed to resend code'
            )
        }
    }, [identifier, loginType, sendOTP])

    const handleBackToLogin = useCallback(() => {
        setStep('input')
        setOtpError('')
        setFieldError('')
    }, [])

    const handleIdentifierChange = useCallback((value: string) => {
        setIdentifier(value)
        setFieldError('')
    }, [])

    const isSubmitDisabled = useMemo(
        () => loading || !identifier.trim(),
        [loading, identifier]
    )

    if (step === 'verify') {
        return (
            <div className="flex items-center justify-center p-4">
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
                                onClick={handleBackToLogin}
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
        <div className="flex items-center justify-center p-4">
            <Card className="w-full max-w-sm rounded-xl">
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
                                            onChange={(e) =>
                                                handleIdentifierChange(
                                                    e.target.value
                                                )
                                            }
                                            required
                                        />
                                    ) : (
                                        <PhoneInput
                                            id="identifier"
                                            placeholder="Enter phone number"
                                            value={identifier}
                                            onChange={handleIdentifierChange}
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
                                disabled={isSubmitDisabled}
                            >
                                {loading ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                ) : loginType === 'email' ? (
                                    <Mail className="h-4 w-4" />
                                ) : (
                                    <Phone className="h-4 w-4" />
                                )}
                                Login
                            </Button>
                            <Button
                                type="button"
                                variant="link"
                                className="w-full text-sm text-muted-foreground hover:text-foreground"
                                onClick={toggleLoginType}
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
    const { updateProfile, uploadPhoto, authState } = useAuth()
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
