export interface FileMetadata {
    id: string
    name: string
    size: number
    type: string
    url: string
}

export interface FileWithPreview {
    id: string
    file: File | FileMetadata
    preview?: string
}

export function formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i]
}

export function useFileUpload(_options: {
    maxFiles: number
    maxSize: number
    accept: string
    multiple: boolean
    initialFiles?: FileMetadata[]
    onFilesChange?: (files: FileWithPreview[]) => void
}) {
    return [
        {
            files: [] as FileWithPreview[],
            isDragging: false,
            errors: [] as string[]
        },
        {
            removeFile: (_id: string) => {},
            clearFiles: () => {},
            handleDragEnter: (_e: React.DragEvent) => {},
            handleDragLeave: (_e: React.DragEvent) => {},
            handleDragOver: (_e: React.DragEvent) => {},
            handleDrop: (_e: React.DragEvent) => {},
            openFileDialog: () => {},
            getInputProps: () => ({})
        }
    ] as const
}
