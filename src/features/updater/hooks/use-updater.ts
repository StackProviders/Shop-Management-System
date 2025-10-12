import { useState, useCallback } from 'react';
import { check, Update, DownloadEvent } from '@tauri-apps/plugin-updater';

export interface UpdateInfo {
  version: string;
  date?: string;
  body?: string;
}

export interface UpdaterState {
  status: 'idle' | 'checking' | 'available' | 'downloading' | 'downloaded' | 'installing' | 'error';
  update?: UpdateInfo;
  error?: string;
  progress?: number;
}

export function useUpdater() {
  const [state, setState] = useState<UpdaterState>({ status: 'idle' });
  const [currentUpdate, setCurrentUpdate] = useState<Update | null>(null);

  const checkForUpdates = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, status: 'checking', error: undefined }));
      
      const update = await check();
      
      if (update) {
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
        setCurrentUpdate(null);
        setState(prev => ({ ...prev, status: 'idle' }));
        return null;
      }
    } catch (error) {
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
      setState(prev => ({ ...prev, status: 'downloading' }));
      
      await currentUpdate.downloadAndInstall((event: DownloadEvent) => {
        switch (event.event) {
          case 'Started':
            setState(prev => ({ ...prev, status: 'downloading' }));
            break;
          case 'Progress':
            // Calculate progress percentage if we have content length
            setState(prev => ({ 
              ...prev, 
              status: 'downloading',
              progress: event.data.chunkLength // This is just chunk length, not percentage
            }));
            break;
          case 'Finished':
            setState(prev => ({ ...prev, status: 'downloaded' }));
            break;
        }
      });
      
      setState(prev => ({ ...prev, status: 'installing' }));
    } catch (error) {
      setState(prev => ({ 
        ...prev, 
        status: 'error',
        error: error instanceof Error ? error.message : 'Failed to install update'
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
  };
}
