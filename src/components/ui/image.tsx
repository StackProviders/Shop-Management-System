import { useState, useEffect, ImgHTMLAttributes } from 'react'
import { fetchAndCacheImage } from '@/lib/image-cache'
import { cn } from '@/lib/utils'

interface ImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
    src: string
    alt: string
    width?: number | string
    height?: number | string
    noCache?: boolean
}

export function Image({
    src,
    alt,
    width,
    height,
    noCache = false,
    className,
    ...props
}: ImageProps) {
    const [imageSrc, setImageSrc] = useState<string>(() =>
        src.startsWith('data:') ||
        src.startsWith('blob:') ||
        src.startsWith('/')
            ? src
            : ''
    )
    const [loading, setLoading] = useState(!imageSrc)
    const [error, setError] = useState(false)

    useEffect(() => {
        let mounted = true
        setError(false)

        if (
            src.startsWith('data:') ||
            src.startsWith('blob:') ||
            src.startsWith('/')
        ) {
            setImageSrc(src)
            setLoading(false)
            return
        }

        setLoading(true)
        fetchAndCacheImage(src, noCache)
            .then((cachedSrc) => {
                if (mounted) {
                    setImageSrc(cachedSrc)
                    setLoading(false)
                }
            })
            .catch(() => {
                if (mounted) {
                    setImageSrc(src)
                    setLoading(false)
                }
            })

        return () => {
            mounted = false
        }
    }, [src, noCache])

    return (
        <>
            {loading && (
                <div
                    className={cn('animate-pulse bg-muted', className)}
                    style={{ width, height }}
                />
            )}
            {error ? (
                <div
                    className={cn(
                        'flex items-center justify-center bg-muted',
                        className
                    )}
                    style={{ width, height }}
                >
                    <span className="text-xs text-muted-foreground">
                        Failed
                    </span>
                </div>
            ) : (
                <img
                    {...props}
                    src={imageSrc || src}
                    alt={alt}
                    width={width}
                    height={height}
                    className={cn(loading && 'hidden', className)}
                    onLoad={() => setLoading(false)}
                    onError={() => setError(true)}
                />
            )}
        </>
    )
}
