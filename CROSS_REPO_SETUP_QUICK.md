# Quick Cross-Repository Setup Guide for GitHub Organizations

## The Problem
You're building in `StackProviders/Shop-Management-System` but publishing to `StackProviders/Shop-Management-App-Publisher`. Both repositories are in a GitHub Organization, and the error "Resource not accessible by personal access token" means your token doesn't have cross-repository permissions within the organization.

## Quick Fix Steps

### 1. Create/Update Your Token
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Create a new token or update existing one with these scopes:
   - ✅ `repo` (Full control)
   - ✅ `admin:org` (REQUIRED for cross-repo access)
   - ✅ `write:packages`
   - ✅ `delete:packages`

### 2. Enable SSO (if required)
- If your organization requires SSO, click "Enable SSO" next to `StackProviders`

### 3. Authorize Token for Organization
- After creating the token, you may see a banner asking to authorize it for the organization
- Click "Authorize" to grant organization access
- This is CRITICAL for cross-repository access within organizations

### 4. Add Secret to Source Repository
- Go to `StackProviders/Shop-Management-System` → Settings → Secrets and variables → Actions
- Add/update secret: `PUBLISHER_REPO_TOKEN` with your token value

### 5. Verify Repository Access
The workflow now includes verification steps that will show you exactly what's wrong:
- Repository access test
- Release creation permission test
- Cross-repository access verification

### 6. Test the Fix
```bash
git tag v1.1.1 && git push origin v1.1.1
```

## What Was Fixed in the Workflow

1. **Added cross-repository verification** - Tests access to both repos
2. **Added manual release creation fallback** - Creates release via API if tauri-action fails
3. **Better error logging** - Shows exactly what permissions are missing
4. **Organization-specific handling** - Proper SSO and org permission handling

## Expected Behavior After Fix

1. Build completes successfully in `StackProviders/Shop-Management-System`
2. Release is created in `StackProviders/Shop-Management-App-Publisher`
3. All artifacts are uploaded to the publisher repository
4. `latest.json` is generated for auto-updater

## If Still Failing

Check the "Verify repository access" step in the workflow logs. It will show you:
- Whether the token can access the publisher repository
- Whether the token has release creation permissions
- Specific error messages for debugging

### Common Organization Issues:
1. **Token not authorized for organization** - Most common issue
2. **Missing `admin:org` scope** - Required for cross-repo access
3. **SSO not enabled** - If organization requires SSO
4. **Organization restrictions** - Check organization settings for token restrictions

### Organization-Specific Troubleshooting:
- Go to your organization settings → Third-party application access policy
- Ensure personal access tokens are allowed
- Check if there are any restrictions on cross-repository access
- Verify your user has appropriate permissions in the organization
