'use client'

import { useRef, useState, useCallback } from 'react'
import { useFormContext, Controller, FieldValues, Path } from 'react-hook-form'
import {
    Field,
    FieldLabel,
    FieldDescription,
    FieldError
} from '@/components/ui/field'
import { Button } from '@/components/ui/button'
import { Image } from '@/components/ui/image'
import { Upload, X, Loader2 } from 'lucide-react'
import { uploadImage } from '@/lib/storage'
import { toast } from 'sonner'

interface FormImageUploadProps<T extends FieldValues> {
    name: Path<T>
    label?: string
    description?: string
    required?: boolean
    orientation?: 'vertical' | 'horizontal' | 'responsive'
    className?: string
    uploadPath: string
    maxSize?: number
    disabled?: boolean
}

export function FormImageUpload<T extends FieldValues>({
    name,
    label,
    description,
    required,
    orientation = 'vertical',
    className,
    uploadPath,
    maxSize = 5 * 1024 * 1024,
    disabled
}: FormImageUploadProps<T>) {
    const { control } = useFormContext<T>()
    const [uploading, setUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = useCallback(
        async (
            e: React.ChangeEvent<HTMLInputElement>,
            onChange: (value: string) => void
        ) => {
            const file = e.target.files?.[0]
            if (!file) return

            if (!file.type.startsWith('image/')) {
                toast.error('Please select an image file')
                return
            }

            if (file.size > maxSize) {
                const sizeMB = Math.round(maxSize / (1024 * 1024))
                toast.error(`Image size must be less than ${sizeMB}MB`)
                return
            }

            setUploading(true)
            try {
                const path = `${uploadPath}/${Date.now()}-${file.name}`
                const url = await uploadImage(file, path)
                onChange(url)
                toast.success('Image uploaded successfully')
            } catch {
                toast.error('Failed to upload image')
            } finally {
                setUploading(false)
                if (fileInputRef.current) fileInputRef.current.value = ''
            }
        },
        [uploadPath, maxSize]
    )

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <Field
                    orientation={orientation}
                    data-invalid={!!error}
                    className={className}
                >
                    {label && (
                        <FieldLabel htmlFor={name}>
                            {label}
                            {required && (
                                <span className="text-destructive ml-1">*</span>
                            )}
                        </FieldLabel>
                    )}
                    <div className="space-y-2">
                        {field.value ? (
                            <div className="relative border rounded-lg p-3 bg-muted/30">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={field.value}
                                        alt="Uploaded"
                                        width={48}
                                        height={48}
                                        className="size-12 object-cover rounded"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm text-muted-foreground">
                                            Image uploaded
                                        </p>
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => field.onChange('')}
                                        disabled={uploading || disabled}
                                    >
                                        <X className="size-4" />
                                    </Button>
                                </div>
                            </div>
                        ) : (
                            <>
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) =>
                                        handleFileChange(e, field.onChange)
                                    }
                                    className="hidden"
                                    disabled={uploading || disabled}
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full border-dashed"
                                    onClick={() =>
                                        fileInputRef.current?.click()
                                    }
                                    disabled={uploading || disabled}
                                >
                                    {uploading ? (
                                        <>
                                            <Loader2 className="size-4 animate-spin" />
                                            Uploading...
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="size-4" />
                                            Upload Image
                                        </>
                                    )}
                                </Button>
                            </>
                        )}
                    </div>
                    {description && (
                        <FieldDescription>{description}</FieldDescription>
                    )}
                    {error && (
                        <FieldError>{error.message as string}</FieldError>
                    )}
                </Field>
            )}
        />
    )
}
