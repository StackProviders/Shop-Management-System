# Firestore Database Schema

## Collections

### shops

Stores shop information.

**Collection Path:** `shops/{shopId}`

**Fields:**

- `shopname` (string, required) - Name of the shop
- `logo_url` (string, optional) - URL to shop logo
- `phone_number` (string, optional) - Shop contact phone number
- `email` (string, optional) - Shop contact email
- `shop_type` (string, optional) - Type of shop (e.g., retail, wholesale)
- `shop_category` (string, optional) - Category of shop (e.g., electronics, clothing)
- `shop_address` (string, optional) - Physical address of the shop
- `signature` (string, optional) - Digital signature or stamp
- `status` (string, required) - Shop status: 'active' | 'inactive' | 'suspended'
- `created_userId` (string, required) - User ID of the shop creator/owner
- `createdAt` (timestamp, required) - Shop creation timestamp
- `updatedAt` (timestamp, required) - Last update timestamp

**Indexes:**

```
- created_userId (ascending)
- status (ascending)
- createdAt (descending)
```

---

### shop_members

Stores shop member information with role-based access control.

**Collection Path:** `shop_members/{memberId}`

**Fields:**

- `shopId` (string, required) - Reference to shop document ID
- `userId` (string, required) - User ID of the member (references users collection)
- `role` (string, required) - Member role: 'owner' | 'admin' | 'manager' | 'staff' | 'viewer'
- `permissions` (array, required) - Array of permission objects
    - `resource` (string) - Resource name (e.g., 'inventory', 'sales', 'reports')
    - `actions` (array) - Array of actions: ['read', 'write', 'delete']
- `invitedBy` (string, required) - User ID who invited this member (references users collection)
- `joinedAt` (timestamp, required) - When member joined the shop
- `createdAt` (timestamp, required) - Record creation timestamp
- `updatedAt` (timestamp, required) - Last update timestamp

**Note:** User data (email, displayName, photoURL) is fetched from the `users` collection at query time using the `userId` reference.

**Indexes:**

```
- shopId (ascending), userId (ascending) [composite]
- userId (ascending)
- shopId (ascending), role (ascending) [composite]
```

---

## Role Hierarchy

1. **OWNER** - Full control, shop creator
2. **ADMIN** - Almost full control, can manage members
3. **MANAGER** - Can manage operations and staff
4. **STAFF** - Can perform daily operations
5. **VIEWER** - Read-only access

## Permission Resources

Common resources:

- `inventory` - Product and stock management
- `sales` - Sales transactions
- `reports` - Business reports and analytics
- `settings` - Shop settings
- `members` - Member management

## Security Rules Example

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    match /shops/{shopId} {
      allow read: if request.auth != null &&
        exists(/databases/$(database)/documents/shop_members/$(request.auth.uid + '_' + shopId));

      allow create: if request.auth != null &&
        request.resource.data.created_userId == request.auth.uid;

      allow update, delete: if request.auth != null &&
        get(/databases/$(database)/documents/shop_members/$(request.auth.uid + '_' + shopId)).data.role in ['owner', 'admin'];
    }

    match /shop_members/{memberId} {
      allow read: if request.auth != null &&
        (resource.data.userId == request.auth.uid ||
         exists(/databases/$(database)/documents/shop_members/$(request.auth.uid + '_' + resource.data.shopId)));

      allow create: if request.auth != null;

      allow update, delete: if request.auth != null &&
        get(/databases/$(database)/documents/shop_members/$(request.auth.uid + '_' + resource.data.shopId)).data.role in ['owner', 'admin'];
    }
  }
}
```
