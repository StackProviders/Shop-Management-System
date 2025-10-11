# Android Keystore Setup

## Generate Keystore

Run this command to generate your keystore:

```bash
keytool -genkey -v -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
```

You'll be prompted for:
- Keystore password
- Key password
- Your name, organization, etc.

## Important
- Keep `release.keystore` secure and NEVER commit it to git
- Save your passwords securely
- The keystore is required to update your app in the future
