import { useState, useCallback, useRef, useMemo } from 'react'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { useStorage } from 'reactfire'
import { toast } from 'sonner'

interface UseUploadOptions {
    path: string
    maxSize?: number
    accept?: string
    onSuccess?: (url: string) => void
    onError?: (error: Error) => void
}

interface UploadProgress {
    percentage: number
    bytesTransferred: number
    totalBytes: number
}

export function useUpload({
    path,
    maxSize = 10 * 1024 * 1024,
    accept = 'image/*',
    onSuccess,
    onError
}: UseUploadOptions) {
    const storage = useStorage()
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(
        null
    )
    const [isUploading, setIsUploading] = useState(false)
    const uploadTaskRef = useRef<ReturnType<
        typeof uploadBytesResumable
    > | null>(null)

    const validateFile = useCallback(
        (file: File): boolean => {
            if (file.size > maxSize) {
                const maxMB = (maxSize / 1024 / 1024).toFixed(0)
                toast.error(`File size must be less than ${maxMB}MB`)
                return false
            }

            const acceptTypes = accept.split(',').map((t) => t.trim())
            const isValidType = acceptTypes.some((type) => {
                if (type === 'image/*') return file.type.startsWith('image/')
                if (type.endsWith('/*'))
                    return file.type.startsWith(type.replace('/*', ''))
                return file.type === type
            })

            if (!isValidType) {
                toast.error('Invalid file type')
                return false
            }

            return true
        },
        [maxSize, accept]
    )

    const selectFile = useCallback(
        (file: File) => {
            if (validateFile(file)) {
                setSelectedFile(file)
            }
        },
        [validateFile]
    )

    const uploadToFirebase = useCallback(
        async (file: File) => {
            if (!navigator.onLine) {
                toast.error(
                    'No internet connection. Please check your network.'
                )
                return
            }

            setIsUploading(true)
            const toastId = toast.loading('Uploading...')

            try {
                const fileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
                const storageRef = ref(storage, `${path}/${fileName}`)

                const uploadTask = uploadBytesResumable(storageRef, file, {
                    contentType: file.type
                })
                uploadTaskRef.current = uploadTask

                uploadTask.on(
                    'state_changed',
                    (snapshot) => {
                        const percentage = Math.round(
                            (snapshot.bytesTransferred / snapshot.totalBytes) *
                                100
                        )
                        setUploadProgress({
                            percentage,
                            bytesTransferred: snapshot.bytesTransferred,
                            totalBytes: snapshot.totalBytes
                        })
                    },
                    (error) => {
                        toast.error(error.message, { id: toastId })
                        onError?.(error)
                        setIsUploading(false)
                        setUploadProgress(null)
                    },
                    async () => {
                        const downloadURL = await getDownloadURL(
                            uploadTask.snapshot.ref
                        )
                        toast.success('Upload complete', { id: toastId })
                        onSuccess?.(downloadURL)
                        setSelectedFile(null)
                        setUploadProgress(null)
                        setIsUploading(false)
                        uploadTaskRef.current = null
                    }
                )
            } catch (error) {
                const err =
                    error instanceof Error ? error : new Error('Upload failed')
                toast.error(err.message, { id: toastId })
                onError?.(err)
                setIsUploading(false)
                setUploadProgress(null)
            }
        },
        [storage, path, onSuccess, onError]
    )

    const cancel = useCallback(() => {
        uploadTaskRef.current?.cancel()
        uploadTaskRef.current = null
        setSelectedFile(null)
        setUploadProgress(null)
        setIsUploading(false)
        toast.info('Upload cancelled')
    }, [])

    return useMemo(
        () => ({
            selectedFile,
            selectFile,
            uploadToFirebase,
            uploadProgress,
            isUploading,
            cancel
        }),
        [
            selectedFile,
            selectFile,
            uploadToFirebase,
            uploadProgress,
            isUploading,
            cancel
        ]
    )
}
