# Android APK Signing Setup Guide

## Problem
Your APK is being built as "unsigned" because the Android signing configuration is not being applied correctly during the GitHub Actions build process.

## Solution

### 1. Generate Android Keystore (if you don't have one)

```bash
# Generate a new keystore
keytool -genkeypair -v -keystore upload.keystore -alias upload -keyalg RSA -keysize 2048 -validity 10000

# When prompted, enter:
# - Keystore password: (remember this)
# - Key password: (can be same as keystore password)
# - Your name and organization details
```

### 2. Convert Keystore to Base64

```bash
# Convert keystore to base64
base64 -i upload.keystore -o upload.keystore.base64

# Copy the content of upload.keystore.base64
cat upload.keystore.base64
```

### 3. Set GitHub Secrets

Go to your GitHub repository → Settings → Secrets and variables → Actions, and add these secrets:

- `ANDROID_KEYSTORE_BASE64`: The base64 content of your keystore file
- `ANDROID_KEYSTORE_PASSWORD`: The keystore password you set
- `ANDROID_KEY_ALIAS`: The alias name (usually "upload")
- `ANDROID_KEY_PASSWORD`: The key password (usually same as keystore password)

### 4. Verify Configuration

The workflow now includes:
- ✅ Proper keystore configuration
- ✅ APK signing verification
- ✅ APK file renaming for proper release
- ✅ Android platform URLs in latest.json

### 5. Test the Build

1. Create a new tag: `git tag v1.0.7 && git push origin v1.0.7`
2. Check the GitHub Actions logs to verify:
   - Keystore is being used (not debug keystore)
   - APK is signed (not unsigned)
   - APK files are properly named and uploaded

### 6. Expected APK Names

After the build, you should see APK files like:
- `Shop.Management.System_1.0.7_arm64-v8a.apk`
- `Shop.Management.System_1.0.7_x86_64.apk`

### 7. Latest.json Update

The latest.json file now includes Android platform URLs:
- `android-aarch64`: For ARM64 devices
- `android-x86_64`: For x86_64 devices

## Troubleshooting

If you still get unsigned APKs:

1. **Check GitHub Secrets**: Ensure all 4 secrets are set correctly
2. **Check Workflow Logs**: Look for "Android signing configured with production keystore"
3. **Verify Keystore**: Make sure the keystore file is valid and not corrupted
4. **Check APK Verification**: The workflow will fail if APK is unsigned

## Notes

- The workflow now includes APK signing verification
- APK files are automatically renamed for proper release
- Android platform URLs are included in the updater configuration
- The build will fail if APK is unsigned, ensuring only signed APKs are released
