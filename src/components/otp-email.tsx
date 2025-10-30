import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Hr,
    Section,
    Text
} from '@react-email/components'
import { render } from '@react-email/render'

interface OTPEmailProps {
    otp: string
}

export const OTPEmail = ({ otp = '123456' }: OTPEmailProps) => (
    <Html>
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1.0"
            />
        </Head>
        <Body style={main}>
            <Container style={container}>
                <Section style={header}>
                    <div style={logoContainer}>
                        <svg
                            width="64"
                            height="64"
                            viewBox="0 0 64 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            style={logoImage}
                        >
                            <rect
                                width="64"
                                height="64"
                                rx="12"
                                fill="white"
                                fillOpacity="0.2"
                            />
                            <path
                                d="M32 16L16 24V40L32 48L48 40V24L32 16Z"
                                fill="white"
                            />
                            <path
                                d="M32 28V44M24 32L32 28L40 32"
                                stroke="#2563eb"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <Heading style={logo}>Shop Management</Heading>
                </Section>

                <Section style={content}>
                    <Text style={greeting}>Hello!</Text>

                    <Text style={title}>Verify Your Email Address</Text>

                    <Text style={description}>
                        We received a request to sign in to your Shop Management
                        account. Please use the verification code below to
                        complete your sign-in:
                    </Text>

                    <Section style={codeContainer}>
                        <Text style={code}>{otp}</Text>
                    </Section>

                    <Text style={expiryText}>
                        ⏱️ This code will expire in <strong>10 minutes</strong>
                    </Text>

                    <Hr style={divider} />

                    <Text style={securityNote}>
                        🔒 <strong>Security Notice:</strong>
                    </Text>
                    <Text style={securityText}>
                        If you didn&apos;t request this code, please ignore this
                        email. Your account remains secure and no action is
                        needed.
                    </Text>
                </Section>

                <Section style={footer}>
                    <Text style={footerText}>
                        © {new Date().getFullYear()} Shop Management System
                    </Text>
                    <Text style={footerSubtext}>Secure OTP authentication</Text>
                </Section>
            </Container>
        </Body>
    </Html>
)

export const renderOTPEmail = async (otp: string): Promise<string> => {
    return await render(<OTPEmail otp={otp} />)
}

const main = {
    backgroundColor: '#f6f9fc',
    fontFamily:
        '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
    padding: '20px 0'
}

const container = {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    margin: '0 auto',
    maxWidth: '600px',
    width: '100%'
}

const header = {
    backgroundColor: '#2563eb',
    borderRadius: '8px 8px 0 0',
    padding: '32px 24px',
    textAlign: 'center' as const
}

const logoContainer = {
    textAlign: 'center' as const,
    marginBottom: '16px'
}

const logoImage = {
    margin: '0 auto',
    display: 'inline-block'
}

const logo = {
    color: '#ffffff',
    fontSize: '28px',
    fontWeight: 700,
    margin: '0',
    textAlign: 'center' as const
}

const content = {
    padding: '40px 24px'
}

const greeting = {
    color: '#1f2937',
    fontSize: '18px',
    fontWeight: 600,
    margin: '0 0 24px 0'
}

const title = {
    color: '#111827',
    fontSize: '24px',
    fontWeight: 700,
    margin: '0 0 16px 0',
    lineHeight: '32px'
}

const description = {
    color: '#4b5563',
    fontSize: '16px',
    lineHeight: '24px',
    margin: '0 0 32px 0'
}

const codeContainer = {
    backgroundColor: '#f3f4f6',
    border: '2px dashed #d1d5db',
    borderRadius: '8px',
    margin: '0 auto 24px',
    padding: '24px',
    textAlign: 'center' as const,
    maxWidth: '320px'
}

const code = {
    color: '#1f2937',
    fontFamily: 'Consolas,Monaco,"Courier New",monospace',
    fontSize: '36px',
    fontWeight: 700,
    letterSpacing: '8px',
    lineHeight: '48px',
    margin: '0',
    textAlign: 'center' as const
}

const expiryText = {
    color: '#6b7280',
    fontSize: '14px',
    lineHeight: '20px',
    margin: '0 0 32px 0',
    textAlign: 'center' as const
}

const divider = {
    borderColor: '#e5e7eb',
    margin: '32px 0'
}

const securityNote = {
    color: '#059669',
    fontSize: '15px',
    fontWeight: 600,
    margin: '0 0 8px 0'
}

const securityText = {
    color: '#6b7280',
    fontSize: '14px',
    lineHeight: '20px',
    margin: '0'
}

const footer = {
    backgroundColor: '#f9fafb',
    borderRadius: '0 0 8px 8px',
    padding: '24px',
    textAlign: 'center' as const
}

const footerText = {
    color: '#6b7280',
    fontSize: '13px',
    fontWeight: 600,
    margin: '0 0 4px 0',
    textAlign: 'center' as const
}

const footerSubtext = {
    color: '#9ca3af',
    fontSize: '12px',
    margin: '0',
    textAlign: 'center' as const
}
