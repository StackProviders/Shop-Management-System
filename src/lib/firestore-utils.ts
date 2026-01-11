import {
    DocumentReference,
    DocumentData,
    UpdateData,
    SetOptions,
    Firestore,
    waitForPendingWrites,
    Timestamp,
    GeoPoint,
    Bytes
} from 'firebase/firestore'

const FIRESTORE_TIMEOUT = 10000 // 10 seconds

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    return Promise.race([
        promise,
        new Promise<T>((_, reject) =>
            setTimeout(
                () => reject(new Error('Firestore operation timed out')),
                timeoutMs
            )
        )
    ])
}

/**
 * Recursively removes undefined values from an object or array.
 * Firestore does not support undefined values.
 */
function removeUndefined(payload: unknown): unknown {
    if (payload === undefined) {
        return undefined
    }
    if (payload === null) {
        return null
    }

    // Preserve basic types
    if (typeof payload !== 'object') {
        return payload
    }

    // Preserve Firestore specific types and Date
    if (
        payload instanceof Date ||
        payload instanceof Timestamp ||
        payload instanceof DocumentReference ||
        payload instanceof GeoPoint ||
        payload instanceof Bytes
    ) {
        return payload
    }

    // Arrays: recursively clean items.
    // If an item becomes undefined (which shouldn't happen with JSON data usually, but possible),
    // we map it to null because Firestore arrays strictly don't allow gaps/undefined.
    if (Array.isArray(payload)) {
        return payload.map((item) => {
            const cleaned = removeUndefined(item)
            return cleaned === undefined ? null : cleaned
        })
    }

    // Objects: recursively clean properties and simple remove keys with undefined values
    const cleanObj: Record<string, unknown> = {}
    const obj = payload as Record<string, unknown>
    Object.keys(obj).forEach((key) => {
        const value = removeUndefined(obj[key])
        if (value !== undefined) {
            cleanObj[key] = value
        }
    })
    return cleanObj
}

export async function setDocWithTimeout(
    reference: DocumentReference<DocumentData>,
    data: DocumentData,
    options?: SetOptions
): Promise<void> {
    const { setDoc } = await import('firebase/firestore')
    const cleanData = removeUndefined(data) as DocumentData
    return withTimeout(
        options
            ? setDoc(reference, cleanData, options)
            : setDoc(reference, cleanData),
        FIRESTORE_TIMEOUT
    )
}

export async function updateDocWithTimeout(
    reference: DocumentReference<DocumentData>,
    data: UpdateData<DocumentData>
): Promise<void> {
    const { updateDoc } = await import('firebase/firestore')
    const cleanData = removeUndefined(data) as UpdateData<DocumentData>
    return withTimeout(updateDoc(reference, cleanData), FIRESTORE_TIMEOUT)
}

export async function deleteDocWithTimeout(
    reference: DocumentReference<DocumentData>
): Promise<void> {
    const { deleteDoc } = await import('firebase/firestore')
    return withTimeout(deleteDoc(reference), FIRESTORE_TIMEOUT)
}

export async function waitForPendingWritesWithTimeout(
    firestore: Firestore,
    timeoutMs: number = FIRESTORE_TIMEOUT
): Promise<void> {
    return withTimeout(waitForPendingWrites(firestore), timeoutMs)
}
