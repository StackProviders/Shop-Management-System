# Fine-Grained Token Setup Checklist

## ✅ Pre-Setup Checklist

- [ ] You have admin/write access to both repositories
- [ ] Both repositories exist in the `StackProviders` organization
- [ ] You have organization admin permissions (or can request them)

## ✅ Step 1: Create Fine-Grained Token

- [ ] Go to GitHub Settings → Developer settings → Personal access tokens → Fine-grained tokens
- [ ] Click "Generate new token"
- [ ] Token name: `Shop Management System Cross-Repo Publisher`
- [ ] Expiration: Set to 1 year (or your preference)
- [ ] **CRITICAL**: Resource owner = `StackProviders` (organization, NOT personal account)

## ✅ Step 2: Repository Access

- [ ] Select "Selected repositories"
- [ ] Add `Shop-Management-System` (source repository)
- [ ] Add `Shop-Management-App-Publisher` (publisher repository)
- [ ] Both repositories should be under `StackProviders` organization

## ✅ Step 3: Permissions (for BOTH repositories)

### Repository Permissions:
- [ ] **Contents**: Read and write
- [ ] **Metadata**: Read
- [ ] **Pull requests**: Write
- [ ] **Issues**: Write
- [ ] **Actions**: Read (optional)

### Account Permissions:
- [ ] **None** (leave as default)

## ✅ Step 4: Generate and Save Token

- [ ] Review all settings carefully
- [ ] Click "Generate token"
- [ ] **IMMEDIATELY** copy the token (you won't see it again!)
- [ ] Save token securely

## ✅ Step 5: Add to Repository Secrets

- [ ] Go to `StackProviders/Shop-Management-System` repository
- [ ] Settings → Secrets and variables → Actions
- [ ] Click "New repository secret"
- [ ] Name: `PUBLISHER_REPO_TOKEN`
- [ ] Value: Paste your fine-grained token
- [ ] Click "Add secret"

## ✅ Step 6: Verify Other Secrets

Make sure these secrets exist in `StackProviders/Shop-Management-System`:

- [ ] `PUBLISH_REPO` = `StackProviders/Shop-Management-App-Publisher`
- [ ] `VITE_FIREBASE_API_KEY` = (your Firebase API key)
- [ ] `VITE_FIREBASE_AUTH_DOMAIN` = (your Firebase auth domain)
- [ ] `VITE_FIREBASE_PROJECT_ID` = (your Firebase project ID)
- [ ] `VITE_FIREBASE_STORAGE_BUCKET` = (your Firebase storage bucket)
- [ ] `VITE_FIREBASE_MESSAGING_SENDER_ID` = (your Firebase messaging sender ID)
- [ ] `VITE_FIREBASE_APP_ID` = (your Firebase app ID)
- [ ] `VITE_GITHUB_TOKEN` = (your GitHub token for frontend)
- [ ] `TAURI_SIGNING_PRIVATE_KEY` = (your signing private key)
- [ ] `TAURI_SIGNING_PRIVATE_KEY_PASSWORD` = (your signing key password)

## ✅ Step 7: Test the Setup

- [ ] Create new tag: `git tag v1.1.2 && git push origin v1.1.2`
- [ ] Go to Actions tab in `StackProviders/Shop-Management-System`
- [ ] Watch the "publish" workflow
- [ ] Check "Verify repository access" step for errors

## ✅ Step 8: Verify Success

After successful setup, you should see:
- [ ] Build completes in `StackProviders/Shop-Management-System`
- [ ] Release is created in `StackProviders/Shop-Management-App-Publisher`
- [ ] All artifacts are uploaded to publisher repository
- [ ] `latest.json` is generated for auto-updater

## 🚨 Common Mistakes to Avoid

- ❌ **Don't select personal account as resource owner** - Must be `StackProviders` organization
- ❌ **Don't forget to add both repositories** - Need access to both source and publisher
- ❌ **Don't set Contents permission to "Read only"** - Must be "Read and write"
- ❌ **Don't lose the token** - Copy it immediately after generation
- ❌ **Don't add token to wrong repository** - Must be added to source repository (`Shop-Management-System`)

## 🔍 Troubleshooting

If you still get "Resource not accessible" error:

1. **Check token permissions** - Verify both repositories are selected with "Read and write" Contents permission
2. **Check organization settings** - Ensure fine-grained tokens are allowed
3. **Check workflow logs** - Look at "Verify repository access" step for specific error messages
4. **Verify repository access** - Make sure both repositories exist and are accessible

## 📞 Need Help?

If you're still having issues:
1. Check the detailed guide in `FINE_GRAINED_TOKEN_SETUP.md`
2. Look at the workflow logs in the "Verify repository access" step
3. Verify your organization settings allow fine-grained tokens
4. Make sure you have the required permissions in both repositories
