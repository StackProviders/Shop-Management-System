import {
    createSerialNumbers,
    removeSerialNumbersByItem
} from '../api/serial-numbers.api'

export function useSerialNumberMutations(shopId: string, itemId: string) {
    const create = async (serialNumbers: string[]) => {
        await createSerialNumbers(shopId, itemId, serialNumbers)
    }

    const remove = async () => {
        await removeSerialNumbersByItem(shopId, itemId)
    }

    const update = async (serialNumbers: string[]) => {
        await removeSerialNumbersByItem(shopId, itemId)
        if (serialNumbers.length > 0) {
            await createSerialNumbers(shopId, itemId, serialNumbers)
        }
    }

    return { create, update, remove }
}
