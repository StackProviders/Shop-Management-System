import { createEntityStore } from '@/features/shared'
import { Party } from '../types'
import { create } from 'zustand'

export const usePartyStore = createEntityStore<Party>()

interface PartyFormState {
    isFormOpen: boolean
    editingPartyId: string | null
    setFormOpen: (open: boolean) => void
    setEditingParty: (id: string | null) => void
    closeForm: () => void
}

export const usePartyFormStore = create<PartyFormState>((set) => ({
    isFormOpen: false,
    editingPartyId: null,
    setFormOpen: (open) => set({ isFormOpen: open }),
    setEditingParty: (id) => set({ editingPartyId: id, isFormOpen: true }),
    closeForm: () => set({ isFormOpen: false, editingPartyId: null })
}))
