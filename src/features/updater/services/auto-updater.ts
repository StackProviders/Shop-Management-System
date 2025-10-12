import { check } from '@tauri-apps/plugin-updater';

type UpdateListener = (available: boolean, version?: string) => void;

export class AutoUpdaterService {
  private static instance: AutoUpdaterService;
  private isInitialized = false;
  private checkInterval: number | null = null;
  private listeners: UpdateListener[] = [];
  private isEnabled = false;

  private constructor() {}

  public static getInstance(): AutoUpdaterService {
    if (!AutoUpdaterService.instance) {
      AutoUpdaterService.instance = new AutoUpdaterService();
    }
    return AutoUpdaterService.instance;
  }

  public setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (enabled && !this.isInitialized) {
      this.initialize();
    } else if (!enabled) {
      this.stopPeriodicChecks();
    }
  }

  public subscribe(listener: UpdateListener): () => void {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners(available: boolean, version?: string): void {
    this.listeners.forEach(listener => listener(available, version));
  }

  public async initialize(): Promise<void> {
    if (this.isInitialized || !this.isEnabled) {
      return;
    }

    try {
      await this.checkForUpdates();
      this.startPeriodicChecks();
      this.isInitialized = true;
      console.log('Auto-updater initialized');
    } catch (error) {
      console.error('Failed to initialize auto-updater:', error);
    }
  }

  public async checkForUpdates(): Promise<void> {
    if (!this.isEnabled) return;
    
    try {
      const update = await check();
      
      if (update) {
        console.log(`Update available: v${update.version}`);
        this.notifyListeners(true, update.version);
      } else {
        console.log('No updates available');
        this.notifyListeners(false);
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
    }
  }

  private startPeriodicChecks(): void {
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
    this.listeners = [];
  }
}

export const autoUpdater = AutoUpdaterService.getInstance();
