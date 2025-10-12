import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useUpdater } from './hooks/use-updater';

export function Updater() {
  const { 
    state, 
    checkForUpdates, 
    downloadAndInstall, 
    isChecking, 
    isDownloading, 
    isInstalling, 
    hasUpdate, 
    isDownloaded,
    hasError 
  } = useUpdater();
  
  const [isAutoCheckEnabled, setIsAutoCheckEnabled] = useState(true);

  useEffect(() => {
    // Auto-check for updates on component mount
    if (isAutoCheckEnabled) {
      checkForUpdates();
    }
  }, [isAutoCheckEnabled, checkForUpdates]);

  const getStatusIcon = () => {
    if (isChecking) return <Loader2 className="h-4 w-4 animate-spin" />;
    if (hasUpdate) return <Download className="h-4 w-4" />;
    if (isDownloading) return <Loader2 className="h-4 w-4 animate-spin" />;
    if (isDownloaded) return <CheckCircle className="h-4 w-4 text-green-500" />;
    if (isInstalling) return <Loader2 className="h-4 w-4 animate-spin" />;
    if (hasError) return <AlertCircle className="h-4 w-4 text-red-500" />;
    return <RefreshCw className="h-4 w-4" />;
  };

  const getStatusText = () => {
    if (isChecking) return 'Checking for updates...';
    if (hasUpdate) return `Update available: v${state.update?.version}`;
    if (isDownloading) return `Downloading update... ${state.progress ? Math.round(state.progress) : 0}%`;
    if (isDownloaded) return 'Update downloaded. Ready to install.';
    if (isInstalling) return 'Installing update...';
    if (hasError) return `Error: ${state.error}`;
    return 'Check for updates';
  };

  const isButtonDisabled = isChecking || isDownloading || isInstalling;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">App Updates</h3>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={isAutoCheckEnabled}
            onChange={(e) => setIsAutoCheckEnabled(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm">Auto-check for updates</span>
        </label>
      </div>

      <div className="flex items-center space-x-3">
        {getStatusIcon()}
        <span className="text-sm">{getStatusText()}</span>
      </div>

      {hasUpdate && state.update && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <h4 className="font-medium text-blue-900 dark:text-blue-100">
            New version available: v{state.update.version}
          </h4>
          {state.update.date && (
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
              Released: {new Date(state.update.date).toLocaleDateString()}
            </p>
          )}
          {state.update.body && (
            <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium">What's new:</p>
              <p className="whitespace-pre-wrap">{state.update.body}</p>
            </div>
          )}
        </div>
      )}

      {isDownloading && state.progress !== undefined && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${state.progress}%` }}
          />
        </div>
      )}

      {hasError && (
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <p className="text-red-700 dark:text-red-300 text-sm">
            {state.error}
          </p>
        </div>
      )}

      <div className="flex space-x-2">
        <Button
          onClick={checkForUpdates}
          disabled={isButtonDisabled}
          variant="outline"
          size="sm"
        >
          {getStatusIcon()}
          <span className="ml-2">
            {isChecking ? 'Checking...' : 'Check for Updates'}
          </span>
        </Button>

        {hasUpdate && (
          <Button
            onClick={downloadAndInstall}
            disabled={isButtonDisabled}
            size="sm"
          >
            <Download className="h-4 w-4" />
            <span className="ml-2">Download & Install</span>
          </Button>
        )}

        {isDownloaded && (
          <Button
            onClick={downloadAndInstall}
            disabled={isButtonDisabled}
            size="sm"
          >
            <CheckCircle className="h-4 w-4" />
            <span className="ml-2">Install Update</span>
          </Button>
        )}
      </div>

      <div className="text-xs text-gray-500 dark:text-gray-400">
        <p>Current version: {import.meta.env.VITE_APP_VERSION || '1.0.0'}</p>
        <p>Updates are checked automatically when the app starts.</p>
      </div>
    </div>
  );
}
