import React, { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Loader2, ArrowLeft, Chrome, ShieldCheck } from 'lucide-react'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot
} from '@/components/ui/input-otp'

interface AuthFormProps {
    onSuccess?: () => void
}

export function LoginForm({ onSuccess }: AuthFormProps) {
    const [email, setEmail] = useState('')
    const [otp, setOtp] = useState('')
    const [showOTP, setShowOTP] = useState(false)
    const { sendOTP, verifyOTP, loginWithGoogle, authState } = useAuth()

    const handleSendOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!email) return

        try {
            await sendOTP(email)
            setShowOTP(true)
        } catch (error) {
            console.error('Failed to send OTP:', error)
        }
    }

    const handleVerifyOTP = async (e: React.FormEvent) => {
        e.preventDefault()
        if (otp.length !== 6) return

        try {
            await verifyOTP(email, otp)
            onSuccess?.()
        } catch (error) {
            console.error('Failed to verify OTP:', error)
        }
    }

    const handleGoogleLogin = async () => {
        try {
            await loginWithGoogle()
            onSuccess?.()
        } catch (error) {
            console.error('Google login failed:', error)
        }
    }

    const handleBackToEmail = () => {
        setShowOTP(false)
        setOtp('')
    }

    if (showOTP) {
        return (
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <ShieldCheck className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle>Enter OTP</CardTitle>
                    <CardDescription>
                        We&apos;ve sent a 6-digit code to{' '}
                        <strong>{email}</strong>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleVerifyOTP} className="space-y-4">
                        <div className="flex justify-center">
                            <InputOTP
                                maxLength={6}
                                value={otp}
                                onChange={setOtp}
                            >
                                <InputOTPGroup>
                                    <InputOTPSlot index={0} />
                                    <InputOTPSlot index={1} />
                                    <InputOTPSlot index={2} />
                                    <InputOTPSlot index={3} />
                                    <InputOTPSlot index={4} />
                                    <InputOTPSlot index={5} />
                                </InputOTPGroup>
                            </InputOTP>
                        </div>

                        {authState.error && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {authState.error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={authState.loading || otp.length !== 6}
                        >
                            {authState.loading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Verify OTP
                        </Button>

                        <Button
                            type="button"
                            variant="ghost"
                            className="w-full"
                            onClick={handleBackToEmail}
                            disabled={authState.loading}
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to email
                        </Button>
                    </form>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center">
                <CardTitle>Welcome back</CardTitle>
                <CardDescription>
                    Sign in to your account using email or Google
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {/* Google Login Button */}
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full"
                        onClick={handleGoogleLogin}
                        disabled={authState.loading}
                    >
                        {authState.loading ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Chrome className="mr-2 h-4 w-4" />
                        )}
                        Continue with Google
                    </Button>

                    {/* Divider */}
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

                    {/* Email Login Form */}
                    <form onSubmit={handleSendOTP} className="space-y-4">
                        <div>
                            <Input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                disabled={authState.loading}
                                required
                            />
                        </div>

                        {authState.error && (
                            <Alert variant="destructive">
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>
                                    {authState.error}
                                </AlertDescription>
                            </Alert>
                        )}

                        <Button
                            type="submit"
                            className="w-full"
                            disabled={authState.loading || !email}
                        >
                            {authState.loading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Send OTP
                        </Button>
                    </form>
                </div>
            </CardContent>
        </Card>
    )
}
