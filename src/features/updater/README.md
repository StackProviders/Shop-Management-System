# Mobile Auto Updater System

A unified auto-updater system that uses Tauri's OS plugin for accurate platform detection and the latest.json endpoint for all platforms.

## Features

- **Tauri OS Plugin Integration**: Uses Tauri's native OS plugin for accurate platform detection
- **Unified Interface**: Single mobile updater component that handles all platforms
- **Latest.json Integration**: Uses custom latest.json endpoint for all platforms
- **Auto-check**: Configurable automatic update checking every 24 hours
- **Progress Tracking**: Real-time download progress with platform-specific handling
- **Error Handling**: Comprehensive error handling with user-friendly messages

## Components

### Core Components

- `UnifiedUpdater`: Main component that uses the mobile updater for all platforms
- `MobileUpdater`: Unified updater using latest.json endpoint with Tauri OS plugin

### Services

- `mobileUpdater`: Service for handling updates via the latest.json API with Tauri OS plugin

### Hooks

- `useMobileUpdater`: React hook for updater state management

## Usage

### Basic Usage

```tsx
import { Updater } from '@/features/updater'

function SettingsPage() {
    return (
        <div>
            <h1>Settings</h1>
            <Updater />
        </div>
    )
}
```

### Direct Mobile Updater Usage

```tsx
import { MobileUpdater } from '@/features/updater'

function MyUpdater() {
    return <MobileUpdater />
}
```

## Mobile Updater Configuration

The mobile updater uses the following endpoint format:

```json
{
    "version": "2.0.2",
    "notes": "See the assets to download this version and install.",
    "pub_date": "2025-10-16T18:07:26.339Z",
    "platforms": {
        "android-aarch64": {
            "signature": "...",
            "url": "https://github.com/.../Shop.Management.System-2.0.2.apk"
        },
        "darwin-aarch64": {
            "signature": "...",
            "url": "https://github.com/.../Shop.Management.System_aarch64.app.tar.gz"
        }
    }
}
```

### Endpoint Configuration

The mobile updater is configured to use:

- **Endpoint**: `https://updater-worker.stackproviders.workers.dev/latest?ttl=300`
- **Platform Detection**: Automatic based on user agent
- **Supported Platforms**: Android (aarch64), iOS (aarch64)

## Tauri OS Plugin Configuration

The updater uses Tauri's OS plugin for platform detection. Ensure the plugin is properly configured in your `lib.rs`:

```rust
use tauri::Builder;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_os::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

## Platform Detection

The system automatically detects the platform using Tauri's OS plugin:

```tsx
import {
    detectPlatform,
    getUpdaterPlatformString
} from '@/utils/platform-detection'

const platformInfo = await detectPlatform()
// Returns: { platform: 'android' | 'ios' | 'windows' | 'macos' | 'linux' | 'mobile-web', ... }

const updaterPlatform = await getUpdaterPlatformString()
// Returns: 'android-aarch64' | 'darwin-aarch64'
```

## State Management

The mobile updater provides comprehensive state management:

```tsx
const {
    state,
    checkForUpdates,
    downloadAndInstall,
    isChecking,
    isDownloading,
    hasUpdate,
    isDownloaded,
    hasError,
    isUpToDate
} = useMobileUpdater()
```

## Error Handling

The system provides detailed error messages for common scenarios:

- Network connectivity issues
- Server errors (404, 403, 500)
- Invalid update files
- Platform-specific installation issues

## Auto-Update Configuration

Users can enable/disable automatic update checking:

```tsx
// The updater automatically saves the user's preference
localStorage.setItem('mobileAutoUpdateEnabled', 'true') // or 'false'
localStorage.setItem('autoUpdateEnabled', 'true') // for desktop
```

## Testing

To test the updater system:

1. **All Platforms**: Run the app in Tauri mode and test against the latest.json endpoint
2. **Platform Detection**: Use the `UpdaterDemo` component to verify Tauri OS plugin platform detection
3. **Mobile Web**: Test in mobile browsers to verify fallback user agent detection

## File Structure

```
src/features/updater/
├── components/
│   ├── mobile-updater.tsx       # Unified updater UI with Tauri OS plugin
│   ├── unified-updater.tsx      # Simplified unified component
│   └── updater-demo.tsx         # Demo component for testing
├── hooks/
│   └── use-mobile-updater.ts    # Unified updater hook
├── services/
│   └── mobile-updater.ts        # Unified updater service with Tauri OS plugin
├── index.tsx                    # Main exports
└── README.md                    # This file
```

## Integration with Latest.json

The unified mobile updater integrates seamlessly with the latest.json endpoint format:

- **Version Comparison**: Semantic version comparison
- **Platform Detection**: Tauri OS plugin with fallback to user agent detection
- **Download Handling**: Platform-specific download URLs based on detected platform
- **Installation**: Platform-appropriate installation methods (APK downloads, App Store redirects)

## Security

- **Signature Verification**: Uses platform-specific signatures when available
- **HTTPS Only**: All update endpoints must use HTTPS
- **Content Validation**: Validates update information before downloading

## Browser Compatibility

The mobile updater is compatible with:

- Modern browsers with Fetch API support
- Progressive Web Apps (PWA)
- Mobile browsers (Chrome, Safari, Firefox)
- WebView implementations

## Future Enhancements

- [ ] Delta updates for smaller download sizes
- [ ] Background update downloading
- [ ] Update rollback functionality
- [ ] Custom update channels (beta, stable)
- [ ] Update notification system
