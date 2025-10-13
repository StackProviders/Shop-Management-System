# GitHub Release Setup Guide

This guide explains how to fix the "Not Found" error when creating releases in your GitHub Actions workflow.

## Issues Fixed

1. **Added `id-token: write` permission** - Required for GitHub Actions to authenticate properly
2. **Changed `releaseDraft: false`** - Creates public releases instead of drafts
3. **Added repository access verification** - Helps debug permission issues
4. **Improved error handling** - Better visibility into what's failing

## Cross-Repository Setup for GitHub Organizations

This workflow builds in `StackProviders/Shop-Management-System` and publishes releases to `StackProviders/Shop-Management-App-Publisher`. Since both repositories are in a GitHub Organization, this requires special token permissions and organization-level access.

## Required GitHub Secrets

You need to configure these secrets in your **source repository** (`StackProviders/Shop-Management-System`):

### 1. Repository Access Token
- **Secret Name**: `PUBLISHER_REPO_TOKEN`
- **Description**: Personal Access Token with cross-repository access
- **Required Scopes**:
  - `repo` (Full control of private repositories)
  - `write:packages` (Upload packages to GitHub Package Registry)
  - `delete:packages` (Delete packages from GitHub Package Registry)
  - `admin:org` (Organization access - required for cross-repo releases)
- **Critical**: This token must have access to BOTH repositories:
  - Source: `StackProviders/Shop-Management-System`
  - Publisher: `StackProviders/Shop-Management-App-Publisher`

### 2. Repository Configuration
- **Secret Name**: `PUBLISH_REPO`
- **Value**: `StackProviders/Shop-Management-App-Publisher`
- **Description**: The target repository where releases will be published

### 3. Firebase Configuration (if using Firebase)
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_STORAGE_BUCKET`
- `VITE_FIREBASE_MESSAGING_SENDER_ID`
- `VITE_FIREBASE_APP_ID`

### 4. GitHub Integration
- **Secret Name**: `VITE_GITHUB_TOKEN`
- **Description**: Token for GitHub API access from the frontend

### 5. Code Signing (for macOS/Windows)
- **Secret Name**: `TAURI_SIGNING_PRIVATE_KEY`
- **Description**: Private key for code signing
- **Secret Name**: `TAURI_SIGNING_PRIVATE_KEY_PASSWORD`
- **Description**: Password for the private key

## How to Create a Personal Access Token

### For Organization Accounts

If your repository is in a GitHub organization, you have two options:

#### Option 1: Personal Access Token (Recommended)
1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "Cross-Repo Shop Management System Publisher"
4. Select these scopes:
   - ✅ `repo` (Full control of private repositories)
   - ✅ `write:packages`
   - ✅ `delete:packages`
   - ✅ `admin:org` (REQUIRED for cross-repository access)
5. **Critical**: If your organization requires SSO, click "Enable SSO" next to your organization
6. **Important**: After creating the token, you MUST authorize it for both repositories:
   - `StackProviders/Shop-Management-System` (source)
   - `StackProviders/Shop-Management-App-Publisher` (publisher)
7. Click "Generate token"
8. Copy the token and add it as `PUBLISHER_REPO_TOKEN` secret in the SOURCE repository

#### Option 2: Fine-Grained Personal Access Token (Newer)
1. Go to GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens
2. Click "Generate new token"
3. Set expiration and resource owner (your organization)
4. **Select BOTH repositories**:
   - `StackProviders/Shop-Management-System` (source)
   - `StackProviders/Shop-Management-App-Publisher` (publisher)
5. Grant these permissions for BOTH repositories:
   - Contents: Read and write
   - Metadata: Read
   - Pull requests: Write (if needed)
   - Issues: Write (if needed)
6. Click "Generate token"
7. Copy the token and add it as `PUBLISHER_REPO_TOKEN` secret in the SOURCE repository

## Repository Setup

### Publisher Repository
The publisher repository (`StackProviders/Shop-Management-App-Publisher`) should:
1. Be a public repository (for public releases)
2. Have the `PUBLISHER_REPO_TOKEN` secret configured
3. Have all required secrets from the list above
4. **For Organizations**: Ensure the token has access to the organization's repositories

### Source Repository
Your source repository should:
1. Have the workflow file in `.github/workflows/publish-to-auto-release.yml`
2. Have the `PUBLISH_REPO` secret pointing to the publisher repository
3. Have all Firebase and signing secrets (if applicable)

### Organization-Specific Considerations
- **SSO Requirements**: If your organization requires SSO, make sure to enable SSO for the token
- **Repository Access**: Verify the token has access to both source and publisher repositories
- **Organization Permissions**: The token owner must have appropriate permissions in the organization
- **Branch Protection**: Ensure the workflow can push to the required branches
- **Organization Settings**: Check organization settings for any restrictions on cross-repository access
- **Token Authorization**: After creating the token, you may need to authorize it for the organization

### Organization Repository Setup Steps

1. **Check Organization Settings**:
   - Go to your organization settings
   - Check "Third-party application access policy"
   - Ensure personal access tokens are allowed

2. **Verify Repository Permissions**:
   - Source repo: `StackProviders/Shop-Management-System`
   - Publisher repo: `StackProviders/Shop-Management-App-Publisher`
   - Both should be accessible by your token

3. **Organization Token Authorization**:
   - After creating the token, you may see a banner asking to authorize it for the organization
   - Click "Authorize" to grant organization access

## Testing the Setup

1. Create a new tag: `git tag v1.0.10 && git push origin v1.0.10`
2. Check the Actions tab in your repository
3. The workflow should now:
   - Build the application for all platforms
   - Create a release in the publisher repository
   - Upload all artifacts
   - Generate the `latest.json` file

## Troubleshooting

### "Not Found" Error
- Verify `PUBLISHER_REPO_TOKEN` has correct permissions
- Check that `PUBLISH_REPO` secret is set correctly
- Ensure the publisher repository exists and is accessible
- **For Organizations**: Verify SSO is enabled for the token if required
- Check that the token has access to the organization's repositories

### "Resource not accessible by personal access token" Error
- **Most Common Cause**: Token doesn't have access to the publisher repository
- Verify the token has `admin:org` scope for cross-repository access
- Check that the token is authorized for BOTH repositories:
  - Source: `StackProviders/Shop-Management-System`
  - Publisher: `StackProviders/Shop-Management-App-Publisher`
- Ensure the token has `repo` scope with full repository access
- **For Organizations**: Verify SSO is enabled for the organization

### Permission Denied
- Verify the token has `repo` scope
- Check that the token hasn't expired
- Ensure the repository is not private (unless token has private repo access)
- **For Organizations**: Ensure the token owner has appropriate organization permissions
- Verify the token is not blocked by organization policies

### Release Creation Fails
- Check the "Verify repository access" step in the workflow logs
- Ensure the publisher repository exists
- Verify the token has write access to the repository

## Workflow Changes Made

1. **Added `id-token: write` permission** to both jobs
2. **Changed `releaseDraft: false`** to create public releases
3. **Added repository access verification step** for debugging
4. **Improved error handling** with better logging

The workflow will now create public releases instead of drafts, which should resolve the "Not Found" error you were experiencing.
