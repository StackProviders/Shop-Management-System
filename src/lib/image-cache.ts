import { fetch } from '@tauri-apps/plugin-http'
import { set, get } from 'tauri-plugin-cache-api'

interface CachedImage {
    data: string
    etag?: string
    lastModified?: string
}

const updateQueue = new Map<string, Promise<void>>()

export async function fetchAndCacheImage(
    url: string,
    noCache = false
): Promise<string> {
    const cacheKey = `img:${url}`

    if (!noCache) {
        const cached = await get<CachedImage>(cacheKey)
        if (cached?.data) {
            if (!updateQueue.has(url)) {
                updateQueue.set(url, checkAndUpdate(url, cached))
            }
            return cached.data
        }
    }

    const response = await fetch(url)
    const blob = await response.blob()
    const base64 = await blobToBase64(blob)
    const dataUrl = `data:${blob.type};base64,${base64}`

    if (!noCache) {
        set(
            cacheKey,
            {
                data: dataUrl,
                etag: response.headers.get('etag') || undefined,
                lastModified: response.headers.get('last-modified') || undefined
            },
            { compress: true }
        ).catch(() => {})
    }

    return dataUrl
}

async function checkAndUpdate(url: string, cached: CachedImage): Promise<void> {
    try {
        const response = await fetch(url, { method: 'HEAD' })
        const etag = response.headers.get('etag')
        const lastModified = response.headers.get('last-modified')

        if (
            (etag && etag !== cached.etag) ||
            (lastModified && lastModified !== cached.lastModified)
        ) {
            const fullResponse = await fetch(url)
            const blob = await fullResponse.blob()
            const base64 = await blobToBase64(blob)
            const dataUrl = `data:${blob.type};base64,${base64}`

            await set(
                `img:${url}`,
                {
                    data: dataUrl,
                    etag: fullResponse.headers.get('etag') || undefined,
                    lastModified:
                        fullResponse.headers.get('last-modified') || undefined
                },
                { compress: true }
            )
        }
    } finally {
        updateQueue.delete(url)
    }
}

function blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => {
            const base64 = (reader.result as string).split(',')[1]
            resolve(base64)
        }
        reader.onerror = reject
        reader.readAsDataURL(blob)
    })
}
