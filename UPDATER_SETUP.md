# Auto-Updater Setup Guide

## Overview
The auto-updater is currently disabled by default. Follow these steps to enable it for your application.

## Prerequisites
1. A GitHub repository for your app
2. GitHub releases configured for your repository
3. Tauri updater signing keys

## Setup Steps

### 1. Generate Signing Keys
Run this command in your project root:
```bash
pnpm tauri signer generate -w ~/.tauri/myapp.key
```

This will generate:
- Private key: `~/.tauri/myapp.key` (keep this secret!)
- Public key: displayed in terminal (copy this)

### 2. Configure tauri.conf.json
Edit `src-tauri/tauri.conf.json`:

```json
{
  "plugins": {
    "updater": {
      "active": true,
      "endpoints": [
        "https://github.com/YOUR_USERNAME/YOUR_REPO/releases/latest/download/latest.json"
      ],
      "dialog": false,
      "pubkey": "YOUR_PUBLIC_KEY_HERE"
    }
  }
}
```

Replace:
- `YOUR_USERNAME` with your GitHub username
- `YOUR_REPO` with your repository name
- `YOUR_PUBLIC_KEY_HERE` with the public key from step 1

### 3. Build and Sign Your App
```bash
pnpm tauri build
```

The build will create updater artifacts in `src-tauri/target/release/bundle/`.

### 4. Create a GitHub Release
1. Go to your GitHub repository
2. Create a new release (e.g., v1.0.0)
3. Upload the following files from `src-tauri/target/release/bundle/`:
   - `.msi` or `.exe` (Windows)
   - `.app.tar.gz` and `.app.tar.gz.sig` (macOS)
   - `.AppImage` and `.AppImage.tar.gz.sig` (Linux)
   - `latest.json` (generated automatically)

### 5. Sign the Release
Use the private key to sign your release:
```bash
pnpm tauri signer sign path/to/your/app.exe -k ~/.tauri/myapp.key
```

### 6. Enable Auto-Updates in the App
Once configured, users can enable auto-updates in Settings:
- Toggle "Auto-check for updates"
- The app will check for updates every 24 hours
- Users can manually check anytime

## Testing
To test the updater:
1. Build version 1.0.0 and create a release
2. Increment version in `package.json` to 1.0.1
3. Build again and create a new release
4. Run the 1.0.0 app and check for updates

## Troubleshooting

### Error: "Could not fetch a valid release JSON"
- Ensure `endpoints` URL is correct
- Verify GitHub release exists with `latest.json`
- Check repository is public or token is configured

### Error: "Signature verification failed"
- Ensure public key in `tauri.conf.json` matches private key
- Verify all release files are signed correctly

### Updates not detected
- Verify version in `package.json` is higher than current
- Check `latest.json` is properly formatted
- Ensure `createUpdaterArtifacts: true` in bundle config

## Security Notes
- Never commit your private key to version control
- Store private key securely (use secrets manager in CI/CD)
- Always sign releases before publishing
- Use HTTPS for update endpoints

## CI/CD Integration
For automated releases, add your private key to GitHub Secrets and use GitHub Actions to build, sign, and release automatically.

Example workflow: https://tauri.app/v1/guides/distribution/updater#github-actions
