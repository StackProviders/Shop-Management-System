# Firebase in Tauri - Setup Guide

## How to Open Browser Console in Tauri

**Right-click anywhere in the app and select "Inspect Element"** or use:
- **Windows/Linux**: `Ctrl + Shift + I` or `F12`
- **macOS**: `Cmd + Option + I`

## Firebase Setup Steps

### 1. Install Firebase
```bash
npm install firebase
```

### 2. Create `.env` file
Create a `.env` file in the root directory:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Configure Firebase Console
1. Go to Firebase Console → Project Settings
2. Enable **Firestore Database** (Start in test mode for development)
3. Copy your Firebase config values to `.env`

### 4. Restart Dev Server
```bash
npm run dev
```

## Troubleshooting

- **Check console** for Firebase errors (Right-click → Inspect)
- **Verify .env file** exists and has correct values
- **Check Firestore rules** in Firebase Console (should allow read/write in test mode)
- **Network errors**: Firebase domains are now whitelisted in tauri.conf.json
