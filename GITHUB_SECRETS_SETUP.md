# GitHub Secrets Setup Guide

This guide explains how to set up the required GitHub secrets for the automated release workflow.

## Required Secrets

### 1. Repository Configuration
- **`PUBLISH_REPO`**: The repository where releases will be published (e.g., `StackProviders/Shop-Management-App-Publisher`)

### 2. GitHub Token
- **`PUBLISHER_REPO_TOKEN`**: A Personal Access Token (PAT) with the following permissions:
  - `repo` (Full control of private repositories)
  - `write:packages` (if using GitHub Packages)
  - `delete:packages` (if using GitHub Packages)

### 3. Firebase Configuration (if using Firebase)
- **`VITE_FIREBASE_API_KEY`**: Your Firebase API key
- **`VITE_FIREBASE_AUTH_DOMAIN`**: Your Firebase auth domain
- **`VITE_FIREBASE_PROJECT_ID`**: Your Firebase project ID
- **`VITE_FIREBASE_STORAGE_BUCKET`**: Your Firebase storage bucket
- **`VITE_FIREBASE_MESSAGING_SENDER_ID`**: Your Firebase messaging sender ID
- **`VITE_FIREBASE_APP_ID`**: Your Firebase app ID

### 4. GitHub Integration (if using GitHub features)
- **`VITE_GITHUB_TOKEN`**: A GitHub token for frontend GitHub integration

### 5. Code Signing (for macOS/Windows)
- **`TAURI_SIGNING_PRIVATE_KEY`**: Your private key for code signing
- **`TAURI_SIGNING_PRIVATE_KEY_PASSWORD`**: Password for the private key

## Setting Up Secrets

### Step 1: Create a Personal Access Token

1. Go to GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a descriptive name like "Shop Management System Release Token"
4. Select the following scopes:
   - `repo` (Full control of private repositories)
   - `write:packages` (if using GitHub Packages)
   - `delete:packages` (if using GitHub Packages)
5. Click "Generate token"
6. Copy the token immediately (you won't be able to see it again)

### Step 2: Add Secrets to Your Repository

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. In the left sidebar, click "Secrets and variables" → "Actions"
4. Click "New repository secret"
5. Add each secret with the exact name and value:

```
Name: PUBLISH_REPO
Value: StackProviders/Shop-Management-App-Publisher

Name: PUBLISHER_REPO_TOKEN
Value: [Your Personal Access Token from Step 1]

Name: VITE_FIREBASE_API_KEY
Value: [Your Firebase API Key]

Name: VITE_FIREBASE_AUTH_DOMAIN
Value: [Your Firebase Auth Domain]

Name: VITE_FIREBASE_PROJECT_ID
Value: [Your Firebase Project ID]

Name: VITE_FIREBASE_STORAGE_BUCKET
Value: [Your Firebase Storage Bucket]

Name: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: [Your Firebase Messaging Sender ID]

Name: VITE_FIREBASE_APP_ID
Value: [Your Firebase App ID]

Name: VITE_GITHUB_TOKEN
Value: [Your GitHub Token for frontend integration]

Name: TAURI_SIGNING_PRIVATE_KEY
Value: [Your Code Signing Private Key]

Name: TAURI_SIGNING_PRIVATE_KEY_PASSWORD
Value: [Your Code Signing Private Key Password]
```

## Important Notes

### Repository Access
- The `PUBLISHER_REPO_TOKEN` must have access to the repository specified in `PUBLISH_REPO`
- If the publish repository is different from your source repository, ensure the token has access to both

### Token Permissions
- The token needs `repo` scope to create releases
- For private repositories, the token must have access to the private repository
- The token should be associated with an account that has write access to the target repository

### Security Best Practices
- Never commit secrets to your repository
- Use environment-specific tokens when possible
- Regularly rotate your tokens
- Use the minimum required permissions for each token

## Troubleshooting

### "Not Found" Error
This usually means:
1. The token doesn't have the required permissions
2. The repository specified in `PUBLISH_REPO` doesn't exist or isn't accessible
3. The token doesn't have access to the target repository

### "Forbidden" Error
This usually means:
1. The token doesn't have write permissions
2. The repository has branch protection rules preventing releases
3. The account associated with the token doesn't have the necessary rights

### Verification Steps
1. Verify the token has the correct scopes
2. Test the token by making a simple API call
3. Ensure the repository exists and is accessible
4. Check that the account has the necessary permissions

## Testing the Setup

After setting up all secrets, you can test the workflow by:

1. Creating a new tag: `git tag v1.0.8`
2. Pushing the tag: `git push origin v1.0.8`
3. The workflow should automatically trigger and create a release

If the workflow fails, check the Actions tab in your repository for detailed error messages.