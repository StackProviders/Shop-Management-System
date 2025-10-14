# Authentication Setup Guide

## ✅ Implementation Complete

Your auth system now includes:

- Email + OTP authentication
- Google OAuth login
- Auto user creation on first login
- Secure OTP with 10-minute expiration

## 🚀 Quick Start

### 1. Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable Authentication:
    - Go to Authentication → Sign-in method
    - Enable **Email/Password**
    - Enable **Google** (optional)
4. Create Firestore Database:
    - Go to Firestore Database → Create database
    - Start in production mode
5. Get your config:
    - Project Settings → General → Your apps
    - Copy the Firebase config values

### 2. Environment Variables

Copy `.env.example` to `.env` and fill in your Firebase credentials:

```bash
cp .env.example .env
```

### 3. Email Service Setup (Required for Production)

Using [Resend](https://resend.com/) (free tier: 3000 emails/month):

1. Sign up at https://resend.com/
2. Verify your domain (or use `onboarding@resend.dev` for testing)
3. Create an API key in the dashboard
4. Add to `.env`:
    ```
    VITE_RESEND_API_KEY=re_xxxxxxxxx
    ```

**Note:** Without Resend API key, OTP will show in browser alert (development mode).

## 📋 How It Works

### Email/OTP Flow:

1. User enters email → clicks "Send OTP"
2. System generates 6-digit OTP (valid 10 minutes)
3. OTP sent via email (or shown in alert for dev)
4. User enters OTP → system verifies
5. If user exists → login
6. If new user → create account → auto login

### Google Flow:

1. User clicks "Continue with Google"
2. Google popup authentication
3. User authenticated → create/update user → auto login

## 🔒 Security Features

- OTP expires after 10 minutes
- Secure password generation per user
- Firebase Authentication handles security
- User data stored in Firestore

## 🎨 UI Components

The login form includes:

- Email input field
- "Send OTP" button
- 6-digit OTP input (shadcn/ui InputOTP)
- Google login button
- Loading states
- Error handling
- Back navigation

## 📁 File Structure

```
src/
├── services/
│   ├── auth.ts              # Auth logic (OTP, login, user management)
│   └── email-service.ts     # Email OTP sending
├── hooks/
│   └── use-auth.tsx         # Auth context & hook
├── components/
│   └── auth/
│       └── auth-forms.tsx   # Login UI
└── types/
    └── auth.ts              # TypeScript types
```

## 🧪 Testing

1. Start dev server: `npm run dev`
2. Navigate to login page
3. Enter email → click "Send OTP"
4. Check console/alert for OTP (dev mode)
5. Enter OTP → verify login

## 🔄 Alternative Email Services

Replace `email-service.ts` with:

- **SendGrid**: https://sendgrid.com/ (100 emails/day free)
- **EmailJS**: https://emailjs.com/ (200 emails/month free)
- **AWS SES**: https://aws.amazon.com/ses/
- **Your own backend API**

## 📞 Support

For issues, check:

- Firebase console for auth errors
- Browser console for detailed logs
- Network tab for API calls
