# Firebase Authentication + Multi-Role Shop Management System

## 🎯 Overview

This implementation provides a complete authentication system with Firebase email OTP and a sophisticated multi-role shop management system. Users can own shops, be admins, or have specific roles like sales manager, accounting, etc.

## 🏗️ Architecture

### Authentication Flow

1. **Email OTP Login**: Users enter email → receive OTP → verify and login
2. **Registration**: New users register → receive OTP → verify and create account
3. **Session Management**: Persistent authentication with Firebase Auth

### Shop Management System

1. **Multi-Shop Support**: Users can be members of multiple shops
2. **Role-Based Access Control**: Different roles with specific permissions
3. **Shop Selection**: Users can switch between their shops
4. **Protected Routes**: Role-based route protection

## 📁 File Structure

```
src/
├── types/
│   ├── auth.ts              # Authentication types
│   └── shop.ts              # Shop and role types
├── services/
│   ├── auth.ts              # Authentication service
│   └── shop.ts              # Shop management service
├── hooks/
│   ├── use-auth.tsx         # Authentication context
│   ├── use-user.ts          # User-related hooks
│   └── use-shop.tsx         # Shop context
├── components/
│   ├── auth/
│   │   ├── auth-page.tsx    # Main auth page
│   │   ├── auth-forms.tsx   # Login/register forms
│   │   └── protected-route.tsx # Route protection
│   └── shop/
│       ├── shop-selection.tsx # Shop selection page
│       └── shop-dashboard.tsx # Role-based dashboard
├── utils/
│   └── permissions.ts       # Permission utilities
└── lib/
    └── firebase.ts          # Firebase configuration
```

## 🔐 Authentication System

### Features

- **Email OTP Authentication**: Secure login without passwords
- **User Registration**: Automatic account creation for new users
- **Session Persistence**: Maintains login state across browser sessions
- **Error Handling**: Comprehensive error management

### Usage

```typescript
import { useAuth } from '@/hooks/use-auth'

function LoginComponent() {
    const { login, register, logout, authState } = useAuth()

    // Login with email
    await login({ email: 'user@example.com' })

    // Register new user
    await register({ email: 'new@example.com', displayName: 'John Doe' })

    // Logout
    await logout()
}
```

## 🏪 Shop Management System

### Roles & Permissions

| Role              | Permissions                                     |
| ----------------- | ----------------------------------------------- |
| **Owner**         | Full access to all features                     |
| **Admin**         | Manage shop, members, inventory, sales, reports |
| **Sales Manager** | Manage inventory, sales, view reports           |
| **Manager**       | Manage inventory, sales, view reports           |
| **Accounting**    | View sales, manage reports, billing             |
| **Sales Staff**   | View inventory, process sales                   |
| **Viewer**        | Read-only access to shop data                   |

### Shop Features

- **Multi-Shop Membership**: Users can belong to multiple shops
- **Role-Based Dashboard**: Different features based on user role
- **Shop Switching**: Easy switching between shops
- **Member Management**: Add/remove members with specific roles

### Usage

```typescript
import { useShop } from '@/hooks/use-shop'

function ShopComponent() {
    const { userShops, currentShop, setCurrentShop, createShop } = useShop()

    // Create new shop
    await createShop({
        name: 'My New Shop',
        description: 'A new business location'
    })

    // Switch to different shop
    setCurrentShop(userShops[1])
}
```

## 🛡️ Security Features

### Route Protection

- **Authentication Required**: All shop routes require login
- **Role-Based Access**: Features shown based on user permissions
- **Shop Context**: Users can only access shops they belong to

### Permission System

```typescript
import { hasPermission, canAccessReports } from '@/utils/permissions'

// Check specific permission
const canEditInventory = hasPermission(userPermissions, 'inventory', 'write')

// Check role-based access
const canViewReports = canAccessReports(userRole)
```

## 🚀 Getting Started

### 1. Firebase Setup

1. Create a Firebase project
2. Enable Authentication with Email/Password
3. Set up Firestore database
4. Configure environment variables:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 2. Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own user document
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Shop access based on membership
    match /shops/{shopId} {
      allow read, write: if request.auth != null &&
        request.auth.uid in resource.data.members[].userId;
    }
  }
}
```

### 3. Usage Examples

#### Login Flow

```typescript
// 1. User enters email
const { sendOTP } = useAuth()
await sendOTP('user@example.com')

// 2. User receives OTP and enters it
const { verifyOTP } = useAuth()
await verifyOTP('user@example.com', '123456')

// 3. User is logged in and redirected to shop selection
```

#### Shop Management

```typescript
// 1. User selects a shop
const { setCurrentShop } = useShop()
setCurrentShop(selectedShop)

// 2. User accesses role-based dashboard
// Features shown based on user's role in that shop

// 3. User can switch between shops
setCurrentShop(anotherShop)
```

## 🔧 Customization

### Adding New Roles

1. Update `ShopRole` enum in `src/types/shop.ts`
2. Add permissions in `src/utils/permissions.ts`
3. Update UI components to handle new role

### Adding New Features

1. Create feature components
2. Add permission checks
3. Update dashboard to show feature based on role
4. Add to navigation if needed

## 📱 Mobile Support

The system is built with Tauri, providing native mobile app capabilities:

- **Barcode Scanner**: Built-in scanner for inventory management
- **Offline Support**: Firestore persistence for offline functionality
- **Native Performance**: Fast, responsive mobile experience

## 🎨 UI Components

Built with modern UI components:

- **Shadcn/UI**: Beautiful, accessible components
- **Tailwind CSS**: Utility-first styling
- **Lucide Icons**: Consistent iconography
- **Responsive Design**: Works on all screen sizes

## 🔄 State Management

- **React Context**: For authentication and shop state
- **Firebase Real-time**: Live updates across devices
- **Local Storage**: Persistent user preferences
- **Error Boundaries**: Graceful error handling

## 🚀 Deployment

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run tauri build
```

### Mobile Build

```bash
npm run tauri android build
npm run tauri ios build
```

## 📊 Future Enhancements

- **Real-time Notifications**: Push notifications for important events
- **Advanced Analytics**: Detailed business insights
- **Multi-location Support**: Manage multiple shop locations
- **API Integration**: Connect with external services
- **Advanced Permissions**: Granular permission system
- **Audit Logs**: Track all user actions
- **Backup & Sync**: Automatic data backup

## 🐛 Troubleshooting

### Common Issues

1. **Firebase Config**: Ensure all environment variables are set
2. **Permissions**: Check Firestore security rules
3. **Authentication**: Verify Firebase Auth is enabled
4. **Build Issues**: Clear node_modules and reinstall

### Debug Mode

Enable debug logging by setting:

```typescript
localStorage.setItem('debug', 'true')
```

## 📞 Support

For issues or questions:

1. Check the troubleshooting section
2. Review Firebase documentation
3. Check Tauri documentation for mobile-specific issues
4. Create an issue in the project repository

---

This system provides a solid foundation for a multi-role shop management application with secure authentication and flexible permission management.
