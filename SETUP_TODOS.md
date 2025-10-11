# Todo App Setup Guide

## 1. Install Firebase Dependencies

```bash
npm install firebase
```

## 2. Add Missing shadcn/ui Components

```bash
npx shadcn@latest add input checkbox
```

## 3. Configure Firebase

Create a `.env` file in the root directory with your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 4. Run the App

```bash
npm run dev
```

Navigate to `/todos` to see the todo app.

## Features

- ✅ Create todos
- ✅ Toggle completion status
- ✅ Delete todos
- ✅ Real-time updates
- ✅ Offline persistence (IndexedDB)
- ✅ Works offline and syncs when back online
