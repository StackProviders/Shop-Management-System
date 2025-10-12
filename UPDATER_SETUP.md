# Tauri Auto Updater Setup Guide

This guide explains how to set up the auto updater for your Tauri React app.

## Overview

The auto updater has been implemented with the following features:
- Automatic update checking on app startup
- Periodic update checks (every 24 hours)
- Update notifications in the UI
- Manual update checking and installation
- Progress tracking during download and installation

## Components Added

### 1. Tauri Configuration
- **File**: `src-tauri/tauri.conf.json`
- **Changes**: Added updater plugin configuration with endpoints and public key

### 2. Rust Integration
- **File**: `src-tauri/src/lib.rs`
- **Changes**: Added updater plugin initialization

### 3. React Components
- **File**: `src/features/updater/index.tsx` - Main updater component
- **File**: `src/features/updater/components/update-notification.tsx` - Update notification banner
- **File**: `src/features/updater/hooks/use-updater.ts` - Updater hook for state management
- **File**: `src/features/updater/services/auto-updater.ts` - Auto-updater service

### 4. UI Integration
- **File**: `src/app/routes/home.tsx` - Added update notification
- **File**: `src/app/routes/settings.tsx` - Settings page with updater controls
- **File**: `src/app/provider.tsx` - Auto-updater initialization

## Setup Instructions

### 1. Generate Signing Keys

You need to generate signing keys for secure updates:

```bash
# Generate private and public keys
pnpm tauri signer generate -w .tauri-key

# This will create:
# - .tauri-key (private key - KEEP SECRET!)
# - .tauri-key.pub (public key - can be shared)
```

### 2. Update Configuration

1. **Update the public key** in `src-tauri/tauri.conf.json`:
   ```json
   {
     "plugins": {
       "updater": {
         "active": true,
         "endpoints": [
           "https://releases.myapp.com/{{target}}/{{arch}}/{{current_version}}"
         ],
         "dialog": true,
         "pubkey": "YOUR_ACTUAL_PUBLIC_KEY_HERE"
       }
     }
   }
   ```

2. **Set up your update server endpoint**:
   - Replace `https://releases.myapp.com/{{target}}/{{arch}}/{{current_version}}` with your actual update server URL
   - The endpoint should return a JSON response with update information

### 3. Environment Variables

For building with updates, set these environment variables:

**Windows (PowerShell):**
```powershell
$env:TAURI_SIGNING_PRIVATE_KEY="Path or content of your private key"
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD="your_password_if_any"
```

**macOS/Linux:**
```bash
export TAURI_SIGNING_PRIVATE_KEY="Path or content of your private key"
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD="your_password_if_any"
```

### 4. Build with Updates

```bash
# Build the app with update artifacts
pnpm tauri build
```

This will create update bundles in the `src-tauri/target/release/bundle/` directory.

## Update Server Setup

### Option 1: Static JSON File

Create a JSON file on your server with this structure:

```json
{
  "version": "1.0.1",
  "notes": "Bug fixes and improvements",
  "pub_date": "2024-01-15T12:00:00Z",
  "platforms": {
    "windows-x86_64": {
      "signature": "signature_here",
      "url": "https://releases.myapp.com/app_1.0.1_x64_en-US.msi"
    },
    "darwin-x86_64": {
      "signature": "signature_here", 
      "url": "https://releases.myapp.com/app_1.0.1_x64.app.tar.gz"
    },
    "linux-x86_64": {
      "signature": "signature_here",
      "url": "https://releases.myapp.com/app_1.0.1_amd64.AppImage.tar.gz"
    }
  }
}
```

### Option 2: Dynamic Update Server

Create a server endpoint that returns update information based on the request parameters:
- `{{target}}` - Platform (windows, darwin, linux)
- `{{arch}}` - Architecture (x86_64, arm64, etc.)
- `{{current_version}}` - Current app version

## GitHub Releases Integration

For GitHub releases, you can use a service like:
- [Tauri Updater Server](https://github.com/tauri-apps/tauri-plugin-updater/tree/dev/examples/server)
- [Update Server](https://github.com/tauri-apps/tauri-plugin-updater/tree/dev/examples/update-server)

## Testing

1. **Development Testing**:
   ```bash
   pnpm tauri dev
   ```

2. **Production Testing**:
   ```bash
   pnpm tauri build
   # Test the built app
   ```

3. **Update Flow Testing**:
   - Build version 1.0.0
   - Create a new version 1.0.1
   - Set up update server
   - Test the update flow

## Security Notes

- **Never commit your private key** to version control
- Store the private key securely (use environment variables or secure key management)
- The public key can be safely included in your app configuration
- Updates are cryptographically signed and verified

## Troubleshooting

### Common Issues

1. **"No updates available" when updates exist**:
   - Check your update server endpoint
   - Verify the JSON response format
   - Check network connectivity

2. **"Invalid signature" error**:
   - Ensure the private key matches the public key in config
   - Verify the update was signed with the correct key

3. **Update download fails**:
   - Check the download URL in your update server response
   - Verify the file exists and is accessible

### Debug Mode

Enable debug logging by setting:
```json
{
  "plugins": {
    "updater": {
      "active": true,
      "debug": true
    }
  }
}
```

## Features

- ✅ Automatic update checking on startup
- ✅ Periodic update checks (24-hour intervals)
- ✅ Update notifications in UI
- ✅ Manual update checking
- ✅ Download progress tracking
- ✅ Installation progress tracking
- ✅ Error handling and user feedback
- ✅ Settings page for update management
- ✅ Cross-platform support (Windows, macOS, Linux)

## Next Steps

1. Generate your signing keys
2. Set up your update server
3. Update the configuration with your keys and endpoints
4. Test the update flow
5. Deploy your update server
6. Build and distribute your app

For more information, see the [Tauri Updater Documentation](https://v2.tauri.app/plugin/updater/).
