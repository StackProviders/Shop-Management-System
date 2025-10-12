import { useState, useCallback } from 'react';
import { check, Update, DownloadEvent } from '@tauri-apps/plugin-updater';
import { APP_VERSION } from '@/lib/config';

export interface UpdateInfo {
  version: string;
  date?: string;
  body?: string;
}

export interface UpdaterState {
  status: 'idle' | 'checking' | 'available' | 'downloading' | 'downloaded' | 'installing' | 'error' | 'up-to-date';
  update?: UpdateInfo;
  error?: string;
  progress?: number;
}

// Helper function to compare semantic versions
function compareVersions(version1: string, version2: string): number {
  const v1parts = version1.split('.').map(Number);
  const v2parts = version2.split('.').map(Number);
  
  for (let i = 0; i < Math.max(v1parts.length, v2parts.length); i++) {
    const v1part = v1parts[i] || 0;
    const v2part = v2parts[i] || 0;
    
    if (v1part > v2part) return 1;
    if (v1part < v2part) return -1;
  }
  
  return 0;
}

export function useUpdater() {
  const [state, setState] = useState<UpdaterState>({ status: 'idle' });
  const [currentUpdate, setCurrentUpdate] = useState<Update | null>(null);

  const checkForUpdates = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, status: 'checking', error: undefined }));

      const update = await check();

      console.log({ update, currentVersion: APP_VERSION });

      if (update) {
        // Compare versions to determine if update is actually newer
        const versionComparison = compareVersions(update.version, APP_VERSION);
        
        if (versionComparison > 0) {
          // Update is newer than current version
          setCurrentUpdate(update);
          setState(prev => ({
            ...prev,
            status: 'available',
            update: {
              version: update.version,
              date: update.date,
              body: update.body
            }
          }));
          return update;
        } else {
          // Current version is same or newer than available update
          setCurrentUpdate(null);
          setState(prev => ({ 
            ...prev, 
            status: 'up-to-date',
            update: {
              version: update.version,
              date: update.date,
              body: update.body
            }
          }));
          return null;
        }
      } else {
        setCurrentUpdate(null);
        setState(prev => ({ ...prev, status: 'idle' }));
        return null;
      }
    } catch (error) {
      console.error('Error checking for updates:', error);
      setState(prev => ({
        ...prev,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      }));
      throw error;
    }
  }, []);

  const downloadAndInstall = useCallback(async () => {
    if (!currentUpdate) {
      throw new Error('No update available to install');
    }

    try {
      setState(prev => ({ ...prev, status: 'downloading', error: undefined }));

      await currentUpdate.downloadAndInstall((event: DownloadEvent) => {
        switch (event.event) {
          case 'Started':
            setState(prev => ({ ...prev, status: 'downloading' }));
            break;
          case 'Progress': {
            setState(prev => ({
              ...prev,
              status: 'downloading',
              progress: event.data.chunkLength
            }));
            break;
          }
          case 'Finished':
            setState(prev => ({ ...prev, status: 'downloaded' }));
            break;
        }
      });

      setState(prev => ({ ...prev, status: 'installing' }));
    } catch (error) {
      console.error('Download/Install error:', error);
      let errorMessage = 'Failed to download or install update';
      
      if (error instanceof Error) {
        if (error.message.includes('404')) {
          errorMessage = 'Update file not found. The release may not have the correct assets uploaded.';
        } else if (error.message.includes('403')) {
          errorMessage = 'Access denied. Check if the release is public and not a draft.';
        } else if (error.message.includes('network') || error.message.includes('timeout')) {
          errorMessage = 'Network error. Please check your internet connection and try again.';
        } else {
          errorMessage = error.message;
        }
      }
      
      setState(prev => ({
        ...prev,
        status: 'error',
        error: errorMessage
      }));
      throw error;
    }
  }, [currentUpdate]);

  return {
    state,
    checkForUpdates,
    downloadAndInstall,
    currentUpdate,
    isChecking: state.status === 'checking',
    isDownloading: state.status === 'downloading',
    isInstalling: state.status === 'installing',
    hasUpdate: state.status === 'available',
    isDownloaded: state.status === 'downloaded',
    hasError: state.status === 'error',
    isUpToDate: state.status === 'up-to-date',
  };
}
