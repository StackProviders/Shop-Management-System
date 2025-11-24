'use client'

import { useState, useEffect } from 'react'
import { useAuth as useFirebaseAuth } from 'reactfire'
import {
    GoogleAuthProvider,
    signInWithPopup,
    signInWithCustomToken
} from 'firebase/auth'
import { sendEmail, getCustomToken } from '@/lib/tauri'
import { OTPInput } from './otp-input'
import { Button, SubmitButton } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup, FieldLabel, FieldSet } from '@/components/ui/field'
import { Card, CardContent } from '@/components/ui/card'
import { Mail } from 'lucide-react'
import Logo from '@/components/logo'
import { useAuth } from './auth-provider'
import { toast } from 'sonner'

interface LoginFormProps {
    onSuccess?: () => void
}

export function LoginForm({ onSuccess }: LoginFormProps) {
    const { isAuthenticated } = useAuth()
    const auth = useFirebaseAuth()
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState(false)
    const [otpSent, setOtpSent] = useState(false)
    const [generatedOtp, setGeneratedOtp] = useState('')

    // Clear OTP state on mount
    useEffect(() => {
        setOtpSent(false)
        setGeneratedOtp('')
    }, [])

    useEffect(() => {
        if (isAuthenticated) {
            onSuccess?.()
        }
    }, [isAuthenticated, onSuccess])

    const handleGoogleLogin = async () => {
        setLoading(true)
        try {
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider)
            toast.success('Signed in with Google')
        } catch (error) {
            console.error('Google sign in error', error)
            toast.error('Failed to sign in with Google')
        } finally {
            setLoading(false)
        }
    }

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        setLoading(true)
        try {
            // Generate 6-digit OTP
            const otp = Math.floor(100000 + Math.random() * 900000).toString()
            setGeneratedOtp(otp)

            const apiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY || ''
            if (!apiKey) {
                console.warn('NEXT_PUBLIC_RESEND_API_KEY is missing')
                // Proceeding might fail if sendEmail checks it strictly, but let's try
            }

            await sendEmail(
                apiKey,
                email,
                'Your Login Code',
                `<p>Your login code is: <strong>${otp}</strong></p>`
            )

            setOtpSent(true)
            toast.success('OTP sent to your email')
        } catch (error) {
            console.error('Error sending OTP', error)
            toast.error('Failed to send OTP')
        } finally {
            setLoading(false)
        }
    }

    const handleVerifyOtp = async (otp: string) => {
        if (otp !== generatedOtp) {
            toast.error('Invalid OTP')
            return
        }

        setLoading(true)
        try {
            // Get custom token from backend (via Tauri)
            // WARNING: Passing secrets from client to backend is not ideal for security,
            // but requested as a workaround for backend .env loading issues.
            // Ensure these vars are prefixed with NEXT_PUBLIC_ in .env to be visible here.
            const serviceAccountEmail =
                process.env.NEXT_PUBLIC_FIREBASE_SERVICE_ACCOUNT_EMAIL || ''
            const privateKey =
                process.env.NEXT_PUBLIC_FIREBASE_PRIVATE_KEY || ''

            if (!serviceAccountEmail || !privateKey) {
                throw new Error(
                    'Missing Firebase credentials in client environment'
                )
            }

            const customToken = await getCustomToken(
                email,
                serviceAccountEmail,
                privateKey
            )

            // Sign in with custom token
            await signInWithCustomToken(auth, customToken)
            toast.success('Successfully signed in!')
            onSuccess?.()
        } catch (error) {
            console.error('Error verifying OTP or signing in', error)
            toast.error('Failed to verify OTP or sign in')
        } finally {
            setLoading(false)
        }
    }

    const handleResendOtp = async () => {
        setLoading(true)
        try {
            const otp = Math.floor(100000 + Math.random() * 900000).toString()
            setGeneratedOtp(otp)

            const apiKey = process.env.NEXT_PUBLIC_RESEND_API_KEY || ''
            await sendEmail(
                apiKey,
                email,
                'Your Login Code',
                `<p>Your login code is: <strong>${otp}</strong></p>`
            )
            toast.success('OTP resent')
        } catch {
            toast.error('Failed to resend OTP')
        } finally {
            setLoading(false)
        }
    }

    if (otpSent) {
        return (
            <Card className="rounded-xl">
                <CardContent>
                    <div className="flex flex-col items-center space-y-5 py-4">
                        <Logo size="md" showTagline />
                        <div className="flex flex-col items-center text-center space-y-2">
                            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-full">
                                <Mail className="size-8 text-green-600 dark:text-green-400" />
                            </div>
                            <h3 className="text-xl font-semibold">Enter OTP</h3>
                            <p className="text-muted-foreground max-w-xs">
                                We sent a code to{' '}
                                <span className="font-medium text-foreground">
                                    {email}
                                </span>
                            </p>
                        </div>

                        <OTPInput
                            onComplete={handleVerifyOtp}
                            onResend={handleResendOtp}
                            disabled={loading}
                        />

                        <Button
                            variant="ghost"
                            className="w-full"
                            onClick={() => setOtpSent(false)}
                            disabled={loading}
                        >
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
                <div className="flex flex-col items-center space-y-6 py-2">
                    <Logo size="md" showTagline />

                    <div className="w-full space-y-3">
                        <Button
                            variant="outline"
                            className="w-full h-11 rounded-xl relative"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            <svg
                                className="mr-2 h-4 w-4"
                                aria-hidden="true"
                                focusable="false"
                                data-prefix="fab"
                                data-icon="google"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 488 512"
                            >
                                <path
                                    fill="currentColor"
                                    d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                                ></path>
                            </svg>
                            Sign in with Google
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    Or continue with email
                                </span>
                            </div>
                        </div>

                        <form onSubmit={handleEmailLogin} className="space-y-4">
                            <FieldSet className="w-full">
                                <FieldGroup>
                                    <Field>
                                        <FieldLabel htmlFor="email">
                                            Email Address
                                        </FieldLabel>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            className="rounded-xl"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            required
                                            disabled={loading}
                                        />
                                    </Field>
                                </FieldGroup>
                            </FieldSet>

                            <SubmitButton
                                type="submit"
                                className="w-full rounded-xl"
                                size="lg"
                                disabled={loading || !email}
                                loading={loading}
                            >
                                <Mail className="size-4 mr-2" />
                                Send Code
                            </SubmitButton>
                        </form>
                    </div>

                    <p className="text-center text-xs text-muted-foreground px-2">
                        By continuing, you agree to Shop Management{' '}
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
                </div>
            </CardContent>
        </Card>
    )
}
