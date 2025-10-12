# GitHub Secrets Setup for Tauri Updater

## Step 1: Generate Signing Keys Locally

Run this command in your project root:

```bash
pnpm tauri signer generate -w .tauri-key
```

This creates two files:
- `.tauri-key` - Private key (DO NOT COMMIT)
- `.tauri-key.pub` - Public key

## Step 2: Add Public Key to tauri.conf.json

Copy the content of `.tauri-key.pub` and update `src-tauri/tauri.conf.json`:

```json
{
  "plugins": {
    "updater": {
      "pubkey": "PASTE_YOUR_PUBLIC_KEY_HERE"
    }
  }
}
```

## Step 3: Add Private Key to GitHub Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secret:

### TAURI_SIGNING_PRIVATE_KEY

- **Name**: `TAURI_SIGNING_PRIVATE_KEY`
- **Value**: Copy the ENTIRE content of `.tauri-key` file (including the header and footer)

Example format:
```
untrusted comment: minisign secret key
RWRTY5x9Q7gSOPb+...your key content here...
```

## Step 4: Add GitHub Token (if using GH_TOKEN)

If you're using `GH_TOKEN` instead of the default `GITHUB_TOKEN`:

1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click **New repository secret**
3. Add:
   - **Name**: `GH_TOKEN`
   - **Value**: Your GitHub Personal Access Token with `repo` scope

Or update the workflow to use the default token:

```yaml
env:
  GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

## Step 5: Verify .gitignore

Ensure `.tauri-key` is in `.gitignore`:

```
.tauri
.tauri-key
.tauri-key.pub
```

## Step 6: Test the Build

1. Commit and push your changes
2. Create a tag: `git tag v1.0.0 && git push origin v1.0.0`
3. Check GitHub Actions for the build

## Important Notes

- **NEVER** commit `.tauri-key` to version control
- The private key should ONLY be in GitHub Secrets
- The public key goes in `tauri.conf.json` (safe to commit)
- Generate keys WITHOUT password for GitHub Actions (or the build will fail)
