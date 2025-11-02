# Firebase Storage Setup Instructions

## Issue

CORS error when uploading images to Firebase Storage from Tauri app.

## Solution

### Step 1: Update Firebase Storage Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `shop-management-system-39d3e`
3. Navigate to **Storage** → **Rules**
4. Copy the rules from `storage.rules` file in the project root
5. Click **Publish**

### Step 2: Deploy Storage Rules (Alternative Method)

If you have Firebase CLI installed:

```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase in your project (if not done)
firebase init storage

# Deploy storage rules
firebase deploy --only storage
```

### Step 3: Verify Rules

After deploying, your storage rules should allow:

- ✅ Public read access to all files
- ✅ Authenticated write access with file size limits
- ✅ Image type validation

### Current Rules Summary

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Testing

1. Make sure you're logged in to the app
2. Try uploading an image
3. Check Firebase Console → Storage to see uploaded files

### Troubleshooting

If you still get CORS errors:

1. **Check Authentication**: Ensure user is logged in
2. **Check File Size**: Max 10MB for items
3. **Check File Type**: Only image files allowed
4. **Clear Browser Cache**: Sometimes old CORS policies are cached
5. **Check Firebase Console**: Verify rules are published

### Security Notes

For production, consider:

- Restricting read access based on user roles
- Adding rate limiting
- Implementing file name sanitization
- Adding virus scanning
