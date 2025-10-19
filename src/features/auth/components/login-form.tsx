import { useState, useEffect, useCallback, useMemo } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import {
    saveLastLoginType,
    getLastLoginType
} from '@/services/auth/storage.service'
import { Button, SubmitButton } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
    FieldDescription
} from '@/components/ui/field'
import { Card, CardContent } from '@/components/ui/card'
import { Mail, Phone, ArrowLeft } from 'lucide-react'
import Logo from '@/components/logo'
import { PhoneInput } from '@/components/ui/phone-input'
import { OTPInput } from '@/components/auth/otp-input'
import { cn } from '@/lib/utils'
import { useAuthActions } from '../hooks'
import { LoginType } from '../types'

interface LoginFormProps {
    onSuccess?: () => void
}

type Step = 'input' | 'verify'

export function LoginForm({ onSuccess }: LoginFormProps) {
    const {
        lastLoginType,
        setLastLoginType,
        isAuthenticated,
        loading: authLoading
    } = useAuthStore()
    const [loginType, setLoginType] = useState<LoginType>(lastLoginType)
    const [step, setStep] = useState<Step>('input')
    const [identifier, setIdentifier] = useState('')
    const [loading, setLoading] = useState(false)
    const [fieldError, setFieldError] = useState('')
    const [otpError, setOtpError] = useState('')
    const { sendOTP, verifyOTP, checkDeviceAndLogin } = useAuthActions()

    useEffect(() => {
        getLastLoginType().then((type) => {
            setLoginType(type)
            setLastLoginType(type)
        })
    }, [setLastLoginType])

    useEffect(() => {
        if (isAuthenticated && !authLoading) {
            onSuccess?.()
        }
    }, [isAuthenticated, authLoading, onSuccess])

    const toggleLoginType = useCallback(() => {
        const newType: LoginType = loginType === 'email' ? 'phone' : 'email'
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
            <Card className="rounded-xl">
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
                            <ArrowLeft className="size-4" />
                            Back to Login
                        </Button>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="rounded-xl">
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
                        <SubmitButton
                            type="submit"
                            className="w-full rounded-xl"
                            size="lg"
                            disabled={isSubmitDisabled}
                            loading={loading}
                        >
                            {loginType === 'email' ? (
                                <Mail className="size-4" />
                            ) : (
                                <Phone className="size-4" />
                            )}
                            Continue
                        </SubmitButton>
                        <Button
                            type="button"
                            variant="ghost"
                            mode="link"
                            className="w-full text-sm text-muted-foreground hover:text-foreground"
                            onClick={toggleLoginType}
                            disabled={loading}
                        >
                            Use{' '}
                            {loginType === 'email' ? 'phone number' : 'email'}{' '}
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
    )
}
