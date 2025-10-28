import { create } from 'zustand'

export interface EntityState<T> {
    items: T[]
    selectedItem: T | null
    isLoading: boolean
    error: string | null
}

export interface EntityActions<T> {
    setItems: (items: T[]) => void
    setSelectedItem: (item: T | null) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    addItemOptimistic: (item: T) => void
    updateItemOptimistic: (id: string, data: Partial<T>) => void
    deleteItemOptimistic: (id: string) => void
    reset: () => void
}

export type EntityStore<T> = EntityState<T> & EntityActions<T>

export function createEntityStore<T extends { id: string }>() {
    return create<EntityStore<T>>((set) => ({
        items: [],
        selectedItem: null,
        isLoading: false,
        error: null,

        setItems: (items) => set({ items }),
        setSelectedItem: (item) => set({ selectedItem: item }),
        setLoading: (loading) => set({ isLoading: loading }),
        setError: (error) => set({ error }),

        addItemOptimistic: (item) =>
            set((state) => ({ items: [item, ...state.items] })),

        updateItemOptimistic: (id, data) =>
            set((state) => ({
                items: state.items.map((item) =>
                    item.id === id ? { ...item, ...data } : item
                )
            })),

        deleteItemOptimistic: (id) =>
            set((state) => ({
                items: state.items.filter((item) => item.id !== id)
            })),

        reset: () =>
            set({
                items: [],
                selectedItem: null,
                isLoading: false,
                error: null
            })
    }))
}
