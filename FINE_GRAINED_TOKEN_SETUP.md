# Fine-Grained Personal Access Token Setup Guide

## Step-by-Step Setup for GitHub Organizations

### Step 1: Create Fine-Grained Personal Access Token

1. **Go to GitHub Settings**
   - Click your profile picture (top right)
   - Select "Settings"

2. **Navigate to Developer Settings**
   - Scroll down in the left sidebar
   - Click "Developer settings"

3. **Access Personal Access Tokens**
   - Click "Personal access tokens"
   - Click "Fine-grained tokens" (NOT "Tokens (classic)")

4. **Generate New Token**
   - Click "Generate new token"
   - Click "Generate new token" again

### Step 2: Configure Token Settings

1. **Token Name**
   - Enter: `Shop Management System Cross-Repo Publisher`

2. **Expiration**
   - Choose your preferred expiration (recommend 1 year)
   - Or "No expiration" if your organization allows it

3. **Resource Owner**
   - Select: `StackProviders` (your organization)
   - This is CRITICAL - must select the organization, not your personal account

### Step 3: Repository Access

1. **Repository Access**
   - Select "Selected repositories"
   - Click "Select repositories"

2. **Add Both Repositories**
   - Search and select: `Shop-Management-System`
   - Search and select: `Shop-Management-App-Publisher`
   - Click "Add repositories"

3. **Verify Selection**
   - You should see both repositories listed
   - Both should be under the `StackProviders` organization

### Step 4: Set Permissions

For **BOTH repositories**, set these permissions:

#### Repository Permissions:
- **Contents**: Read and write
- **Metadata**: Read
- **Pull requests**: Write
- **Issues**: Write
- **Actions**: Read (if you need to access workflow runs)

#### Account Permissions:
- **None** (leave as default)

### Step 5: Generate and Copy Token

1. **Review Settings**
   - Verify organization: `StackProviders`
   - Verify repositories: Both `Shop-Management-System` and `Shop-Management-App-Publisher`
   - Verify permissions: Contents (Read and write), Metadata (Read), etc.

2. **Generate Token**
   - Click "Generate token"
   - **IMPORTANT**: Copy the token immediately - you won't see it again!

3. **Save Token Securely**
   - Store the token in a secure location
   - You'll need it for the next step

### Step 6: Add Token to Repository Secrets

1. **Go to Source Repository**
   - Navigate to: `https://github.com/StackProviders/Shop-Management-System`

2. **Access Repository Settings**
   - Click "Settings" tab
   - Click "Secrets and variables" in left sidebar
   - Click "Actions"

3. **Add New Secret**
   - Click "New repository secret"
   - Name: `PUBLISHER_REPO_TOKEN`
   - Value: Paste your fine-grained token
   - Click "Add secret"

### Step 7: Verify Other Required Secrets

Make sure these secrets exist in `StackProviders/Shop-Management-System`:

- `PUBLISH_REPO` = `StackProviders/Shop-Management-App-Publisher`
- `VITE_FIREBASE_API_KEY` = (your Firebase API key)
- `VITE_FIREBASE_AUTH_DOMAIN` = (your Firebase auth domain)
- `VITE_FIREBASE_PROJECT_ID` = (your Firebase project ID)
- `VITE_FIREBASE_STORAGE_BUCKET` = (your Firebase storage bucket)
- `VITE_FIREBASE_MESSAGING_SENDER_ID` = (your Firebase messaging sender ID)
- `VITE_FIREBASE_APP_ID` = (your Firebase app ID)
- `VITE_GITHUB_TOKEN` = (your GitHub token for frontend)
- `TAURI_SIGNING_PRIVATE_KEY` = (your signing private key)
- `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` = (your signing key password)

### Step 8: Test the Setup

1. **Create a New Tag**
   ```bash
   git tag v1.1.2 && git push origin v1.1.2
   ```

2. **Monitor the Workflow**
   - Go to Actions tab in `StackProviders/Shop-Management-System`
   - Watch the "publish" workflow
   - Check the "Verify repository access" step for any errors

### Step 9: Troubleshooting

If you still get "Resource not accessible" error:

1. **Check Token Permissions**
   - Go back to your token settings
   - Verify both repositories are selected
   - Verify Contents permission is "Read and write"

2. **Check Organization Settings**
   - Go to `StackProviders` organization settings
   - Check "Third-party application access policy"
   - Ensure fine-grained tokens are allowed

3. **Verify Repository Access**
   - Make sure both repositories exist and are accessible
   - Check that you have admin/write access to both repositories

4. **Check Workflow Logs**
   - Look at the "Verify repository access" step
   - It will show exactly what's failing

### Common Issues and Solutions

**Issue**: "Repository not found"
- **Solution**: Make sure you selected the organization (`StackProviders`) as resource owner, not your personal account

**Issue**: "Insufficient permissions"
- **Solution**: Verify Contents permission is set to "Read and write" for both repositories

**Issue**: "Organization access denied"
- **Solution**: Check organization settings allow fine-grained tokens

**Issue**: "Token not authorized"
- **Solution**: Make sure the token was created under the organization, not personal account

### Expected Success Behavior

After successful setup:
1. ✅ Build completes in `StackProviders/Shop-Management-System`
2. ✅ Release is created in `StackProviders/Shop-Management-App-Publisher`
3. ✅ All artifacts are uploaded
4. ✅ `latest.json` is generated

The key difference with fine-grained tokens is that you must select the **organization** as the resource owner, not your personal account, and explicitly grant access to both repositories.
