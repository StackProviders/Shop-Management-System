import { Repository } from '@firestore-repository/firebase-js-sdk'
import { db } from '@/lib/firebase'
import {
    shopsCollection,
    shopMembersCollection,
    usersCollection,
    userIdentifiersCollection,
    otpRequestsCollection,
    trustedDevicesCollection
} from './schema'

export const shopsRepo = new Repository(shopsCollection, db)
export const shopMembersRepo = new Repository(shopMembersCollection, db)
export const usersRepo = new Repository(usersCollection, db)
export const userIdentifiersRepo = new Repository(userIdentifiersCollection, db)
export const otpRequestsRepo = new Repository(otpRequestsCollection, db)
export const trustedDevicesRepo = new Repository(trustedDevicesCollection, db)
