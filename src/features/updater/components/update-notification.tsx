import { Button } from '@/components/ui/button';
import { Download, X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { useUpdater } from '../hooks/use-updater';

interface UpdateNotificationProps {
  onDismiss?: () => void;
  className?: string;
}

export function UpdateNotification({ onDismiss, className = '' }: UpdateNotificationProps) {
  const { 
    state, 
    downloadAndInstall, 
    isDownloading, 
    isInstalling, 
    hasUpdate, 
    isDownloaded,
    hasError 
  } = useUpdater();

  // Don't show notification if no update available or if there's an error
  if (!hasUpdate && !isDownloaded && !hasError) {
    return null;
  }

  const getIcon = () => {
    if (isDownloading || isInstalling) {
      return <Loader2 className="h-4 w-4 animate-spin" />;
    }
    if (isDownloaded) {
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    }
    if (hasError) {
      return <AlertCircle className="h-4 w-4 text-red-500" />;
    }
    return <Download className="h-4 w-4" />;
  };

  const getMessage = () => {
    if (isDownloading) {
      return `Downloading update... ${state.progress ? Math.round(state.progress) : 0}%`;
    }
    if (isInstalling) {
      return 'Installing update...';
    }
    if (isDownloaded) {
      return 'Update ready to install';
    }
    if (hasError) {
      return `Update error: ${state.error}`;
    }
    return `Update available: v${state.update?.version}`;
  };

  const getButtonText = () => {
    if (isDownloaded) {
      return 'Install Now';
    }
    if (isDownloading || isInstalling) {
      return 'Installing...';
    }
    return 'Download & Install';
  };

  const isButtonDisabled = isDownloading || isInstalling;

  return (
    <div className={`bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getIcon()}
          <div>
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              {getMessage()}
            </p>
            {state.update?.body && !isDownloading && !isInstalling && (
              <p className="text-xs text-blue-700 dark:text-blue-300 mt-1 line-clamp-2">
                {state.update.body}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {(hasUpdate || isDownloaded) && !hasError && (
            <Button
              onClick={downloadAndInstall}
              disabled={isButtonDisabled}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {getButtonText()}
            </Button>
          )}
          
          {onDismiss && (
            <Button
              onClick={onDismiss}
              variant="ghost"
              size="sm"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {isDownloading && state.progress !== undefined && (
        <div className="mt-3 w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${state.progress}%` }}
          />
        </div>
      )}
    </div>
  );
}
