import { describe, it, expect, vi } from 'vitest'
import { setDocWithTimeout } from './firestore-utils'
import { DocumentReference, DocumentData } from 'firebase/firestore'

const mocks = vi.hoisted(() => {
    return {
        setDoc: vi.fn(),
        waitForPendingWrites: vi.fn()
    }
})

// Mock firebase/firestore
vi.mock('firebase/firestore', () => ({
    Timestamp: class Timestamp {
        seconds: number
        nanoseconds: number
        constructor(s: number, n: number) {
            this.seconds = s
            this.nanoseconds = n
        }
    },
    GeoPoint: class GeoPoint {},
    Bytes: class Bytes {},
    DocumentReference: class DocumentReference {},
    waitForPendingWrites: mocks.waitForPendingWrites,
    setDoc: mocks.setDoc,
    doc: vi.fn(),
    collection: vi.fn()
}))

describe('firestore-utils', () => {
    it('should remove undefined from nested objects', async () => {
        const ref = {} as unknown as DocumentReference<DocumentData>
        const input = {
            a: 1,
            b: undefined,
            c: {
                d: 2,
                e: undefined
            }
        }

        await setDocWithTimeout(ref, input)

        // Check the second argument (data)
        const callArgs = mocks.setDoc.mock.calls[0]
        expect(callArgs[0]).toBe(ref)
        expect(callArgs[1]).toEqual({
            a: 1,
            c: { d: 2 }
        })
    })

    it('should convert undefined in arrays to null', async () => {
        mocks.setDoc.mockClear()
        const ref = {} as unknown as DocumentReference<DocumentData>
        const input = {
            arr: [1, undefined, { a: undefined, b: 2 }]
        }

        await setDocWithTimeout(ref, input)

        const callArgs = mocks.setDoc.mock.calls[0]
        expect(callArgs[1]).toEqual({
            arr: [1, null, { b: 2 }]
        })
    })

    it('should preserve Date objects', async () => {
        mocks.setDoc.mockClear()
        const ref = {} as unknown as DocumentReference<DocumentData>
        const date = new Date()
        const input = {
            date: date
        }

        await setDocWithTimeout(ref, input)

        const callArgs = mocks.setDoc.mock.calls[0]
        expect(callArgs[1]).toEqual({
            date: date
        })
    })
})
