import {
    DocumentReference,
    DocumentData,
    UpdateData,
    SetOptions,
    Firestore,
    waitForPendingWrites
} from 'firebase/firestore'

const FIRESTORE_TIMEOUT = 1000 // 1 second

function withTimeout<T>(promise: Promise<T>, timeoutMs: number): Promise<T> {
    return Promise.race([
        promise,
        new Promise<T>((resolve) =>
            setTimeout(() => resolve(undefined as T), timeoutMs)
        )
    ])
}

export async function setDocWithTimeout(
    reference: DocumentReference<DocumentData>,
    data: DocumentData,
    options?: SetOptions
): Promise<void> {
    const { setDoc } = await import('firebase/firestore')
    const cleanData = Object.fromEntries(
        Object.entries(data).filter(([, v]) => v !== undefined)
    )
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
    const cleanData = Object.fromEntries(
        Object.entries(data).filter(([, v]) => v !== undefined)
    )
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
