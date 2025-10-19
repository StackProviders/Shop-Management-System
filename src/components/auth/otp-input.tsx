import { useEffect, useRef, useState } from 'react'
import { Button, SubmitButton } from '@/components/ui/button'
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot
} from '@/components/ui/input-otp'
import { FieldDescription } from '@/components/ui/field'
import { cn } from '@/lib/utils'

interface OTPCredential extends Credential {
    code: string
}

interface OTPInputProps {
    onComplete: (value: string) => void
    onResend: () => void
    onManualSubmit?: (value: string) => void
    error?: string
    disabled?: boolean
}

export function OTPInput({
    onComplete,
    onResend,
    onManualSubmit,
    error,
    disabled
}: OTPInputProps) {
    const [value, setValue] = useState('')
    const [countdown, setCountdown] = useState(60)
    const [canResend, setCanResend] = useState(false)
    const inputRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
            return () => clearTimeout(timer)
        }
        setCanResend(true)
    }, [countdown])

    useEffect(() => {
        // Auto-focus on mount
        const input = inputRef.current?.querySelector('input')
        input?.focus()

        // SMS autofill for mobile (WebOTP API)
        if ('OTPCredential' in window) {
            const ac = new AbortController()
            navigator.credentials
                .get({
                    otp: { transport: ['sms'] },
                    signal: ac.signal
                } as CredentialRequestOptions)
                .then((otp) => {
                    const otpCredential = otp as OTPCredential | null
                    if (otpCredential?.code) {
                        setValue(otpCredential.code)
                        if (otpCredential.code.length === 6) {
                            onComplete(otpCredential.code)
                        }
                    }
                })
                .catch(() => {})

            return () => ac.abort()
        }
    }, [])

    const handleChange = (newValue: string) => {
        setValue(newValue)
        if (newValue.length === 6) {
            onComplete(newValue)
        }
    }

    const handleManualSubmit = () => {
        if (value.length === 6 && onManualSubmit) {
            onManualSubmit(value)
        }
    }

    const handleResend = () => {
        setCountdown(60)
        setCanResend(false)
        setValue('')
        onResend()
    }

    return (
        <div className="space-y-4 w-full">
            <div ref={inputRef}>
                <InputOTP
                    maxLength={6}
                    value={value}
                    onChange={handleChange}
                    disabled={disabled}
                    autoFocus
                    containerClassName="justify-center"
                >
                    <InputOTPGroup>
                        <InputOTPSlot
                            className={cn(
                                'bg-background rounded-lg',
                                error && 'border-destructive'
                            )}
                            index={0}
                        />
                        <InputOTPSlot
                            className={cn(
                                'bg-background rounded-lg',
                                error && 'border-destructive'
                            )}
                            index={1}
                        />
                        <InputOTPSlot
                            className={cn(
                                'bg-background rounded-lg',
                                error && 'border-destructive'
                            )}
                            index={2}
                        />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                        <InputOTPSlot
                            className={cn(
                                'bg-background rounded-lg',
                                error && 'border-destructive'
                            )}
                            index={3}
                        />
                        <InputOTPSlot
                            className={cn(
                                'bg-background rounded-lg',
                                error && 'border-destructive'
                            )}
                            index={4}
                        />
                        <InputOTPSlot
                            className={cn(
                                'bg-background rounded-lg',
                                error && 'border-destructive'
                            )}
                            index={5}
                        />
                    </InputOTPGroup>
                </InputOTP>
            </div>

            <FieldDescription
                className={cn('text-center', error && 'text-destructive')}
            >
                {error || 'Code will auto-submit when complete'}
            </FieldDescription>

            <SubmitButton
                type="button"
                className="w-full rounded-xl"
                size="lg"
                disabled={disabled || value.length !== 6}
                onClick={handleManualSubmit}
                loading={disabled}
            >
                Verify Code
            </SubmitButton>

            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                    {canResend
                        ? "Didn't receive the code?"
                        : `Resend code in ${countdown}s`}
                </span>
                <Button
                    type="button"
                    className="h-auto p-0"
                    disabled={!canResend}
                    onClick={handleResend}
                    size="sm"
                    mode="link"
                >
                    Resend Code
                </Button>
            </div>
        </div>
    )
}
