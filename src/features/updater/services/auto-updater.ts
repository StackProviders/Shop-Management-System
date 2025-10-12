import { check } from '@tauri-apps/plugin-updater';

export class AutoUpdaterService {
  private static instance: AutoUpdaterService;
  private isInitialized = false;
  private checkInterval: number | null = null;

  private constructor() {}

  public static getInstance(): AutoUpdaterService {
    if (!AutoUpdaterService.instance) {
      AutoUpdaterService.instance = new AutoUpdaterService();
    }
    return AutoUpdaterService.instance;
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    try {
      // Check for updates on startup
      await this.checkForUpdates();
      
      // Set up periodic checks (every 24 hours)
      this.startPeriodicChecks();
      
      this.isInitialized = true;
      console.log('Auto-updater initialized');
    } catch (error) {
      console.error('Failed to initialize auto-updater:', error);
    }
  }

  private async checkForUpdates(): Promise<void> {
    try {
      const update = await check();
      
      if (update?.available) {
        console.log(`Update available: v${update.version}`);
        // The UpdateNotification component will handle showing the update to the user
      } else {
        console.log('No updates available');
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  }

  private startPeriodicChecks(): void {
    // Check for updates every 24 hours (in milliseconds)
    const CHECK_INTERVAL = 24 * 60 * 60 * 1000;
    
    this.checkInterval = window.setInterval(() => {
      this.checkForUpdates();
    }, CHECK_INTERVAL);
  }

  public stopPeriodicChecks(): void {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  public destroy(): void {
    this.stopPeriodicChecks();
    this.isInitialized = false;
  }
}

// Export singleton instance
export const autoUpdater = AutoUpdaterService.getInstance();
