import { createEntityStore } from '@/features/shared'
import { Party } from '../types'

export const usePartyStore = createEntityStore<Party>()
