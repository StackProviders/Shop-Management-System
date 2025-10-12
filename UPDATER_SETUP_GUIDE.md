# Tauri Updater Setup Guide

## Current Status
✅ Updater plugin is now enabled in `tauri.conf.json`
✅ Capabilities are configured for updater permissions
✅ Auto-updater service is fixed to handle correct API responses

## Next Steps to Complete Setup

### 1. Generate New Signing Keys
The current public key in the config is from a different project. You need to generate your own:

```bash
# Generate new signing keys
pnpm tauri signer generate -w ~/.tauri/myapp.key

# This will create:
# - ~/.tauri/myapp.key (private key - KEEP SECRET!)
# - ~/.tauri/myapp.key.pub (public key - use in tauri.conf.json)
```

### 2. Update tauri.conf.json with Your Public Key
Replace the `pubkey` value in `src-tauri/tauri.conf.json` with your generated public key.

### 3. Set Environment Variables for Building
Before building, set your private key:

**Windows (PowerShell):**
```powershell
$env:TAURI_SIGNING_PRIVATE_KEY="Path or content of your private key"
$env:TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""  # if you set a password
```

**Mac/Linux:**
```bash
export TAURI_SIGNING_PRIVATE_KEY="Path or content of your private key"
export TAURI_SIGNING_PRIVATE_KEY_PASSWORD=""  # if you set a password
```

### 4. Build with Updater Artifacts
```bash
pnpm tauri build
```

This will create update artifacts in `src-tauri/target/release/bundle/updater/`

### 5. Create GitHub Release
1. Go to your GitHub repository releases
2. Create a new release with version tag (e.g., `v1.0.9`)
3. Upload the update artifacts from the build output
4. Upload the `latest.json` file (update version numbers and URLs to match your release)

### 6. Test the Updater
1. Build and run your app
2. Go to Settings page
3. Click "Check for Updates"
4. The updater should now work correctly

## Important Notes

- **Never share your private key** - it's used to sign updates
- **Keep your private key safe** - if you lose it, you can't update existing installations
- The `latest.json` file must be updated for each new release
- Update URLs in `latest.json` must match your actual release assets
- Version numbers in `latest.json` must be higher than the current app version

## Troubleshooting

If updates still don't work:
1. Check browser console for errors
2. Verify the `latest.json` URL is accessible
3. Ensure version numbers are correct
4. Check that the public key matches your private key
5. Verify the update artifacts were created during build
