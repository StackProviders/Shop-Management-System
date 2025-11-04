# nuqs Integration with TanStack Router

## Setup Complete ✅

nuqs is now integrated with TanStack Router for type-safe URL search params management.

## Usage

### 1. Define Search Params Schema

```typescript
import { createFileRoute } from '@tanstack/react-router'
import {
    createStandardSchemaV1,
    parseAsString,
    parseAsInteger,
    parseAsBoolean,
    useQueryStates
} from 'nuqs'

const searchParams = {
    search: parseAsString.withDefault(''),
    filter: parseAsString.withDefault('all'),
    page: parseAsInteger.withDefault(1),
    active: parseAsBoolean.withDefault(true)
}

export const Route = createFileRoute('/my-route')({
    component: MyComponent,
    validateSearch: createStandardSchemaV1(searchParams, {
        partialOutput: true
    })
})
```

### 2. Use in Component

```typescript
function MyComponent() {
  const [{ search, filter, page, active }, setParams] = useQueryStates(searchParams)

  return (
    <div>
      {/* Update single param */}
      <input
        value={search}
        onChange={(e) => setParams({ search: e.target.value })}
      />

      {/* Update multiple params */}
      <button onClick={() => setParams({ filter: 'active', page: 1 })}>
        Filter Active
      </button>

      {/* Use with Link */}
      <Link
        to="/my-route"
        search={{ search: 'foo', page: 2 }}
      >
        Go to page 2
      </Link>
    </div>
  )
}
```

### 3. Available Parsers

```typescript
import {
    parseAsString,
    parseAsInteger,
    parseAsFloat,
    parseAsBoolean,
    parseAsArrayOf,
    parseAsStringEnum,
    parseAsIsoDateTime,
    parseAsTimestamp
} from 'nuqs'

// String
search: parseAsString.withDefault('')

// Number
page: parseAsInteger.withDefault(1)
price: parseAsFloat.withDefault(0.0)

// Boolean
active: parseAsBoolean.withDefault(true)

// Array
tags: parseAsArrayOf(parseAsString).withDefault([])

// Enum
status: parseAsStringEnum(['active', 'inactive']).withDefault('active')

// Date
createdAt: parseAsIsoDateTime.withDefault(new Date())
timestamp: parseAsTimestamp.withDefault(Date.now())
```

## Real-World Examples

### Items List with Filters

```typescript
// src/routes/_protected/_dashboard/items.tsx
import { createFileRoute } from '@tanstack/react-router'
import { createStandardSchemaV1, parseAsString, parseAsInteger, useQueryStates } from 'nuqs'

const searchParams = {
  search: parseAsString.withDefault(''),
  category: parseAsString.withDefault('all'),
  page: parseAsInteger.withDefault(1),
  sort: parseAsString.withDefault('name')
}

export const Route = createFileRoute('/_protected/_dashboard/items')({
  component: ItemsPage,
  validateSearch: createStandardSchemaV1(searchParams, {
    partialOutput: true
  })
})

function ItemsPage() {
  const [{ search, category, page, sort }, setParams] = useQueryStates(searchParams)

  return (
    <div>
      <SearchInput
        value={search}
        onChange={(value) => setParams({ search: value, page: 1 })}
      />

      <Select
        value={category}
        onChange={(value) => setParams({ category: value, page: 1 })}
      >
        <option value="all">All Categories</option>
        <option value="electronics">Electronics</option>
      </Select>

      <ItemsList
        search={search}
        category={category}
        page={page}
        sort={sort}
      />

      <Pagination
        page={page}
        onPageChange={(p) => setParams({ page: p })}
      />
    </div>
  )
}
```

### Parties List with Filters

```typescript
// src/routes/_protected/_dashboard/parties.tsx
const searchParams = {
  search: parseAsString.withDefault(''),
  type: parseAsStringEnum(['all', 'customer', 'supplier']).withDefault('all'),
  status: parseAsStringEnum(['all', 'active', 'inactive']).withDefault('all'),
  balance: parseAsStringEnum(['all', 'positive', 'negative', 'zero']).withDefault('all')
}

export const Route = createFileRoute('/_protected/_dashboard/parties')({
  component: PartiesPage,
  validateSearch: createStandardSchemaV1(searchParams, {
    partialOutput: true
  })
})

function PartiesPage() {
  const [filters, setFilters] = useQueryStates(searchParams)

  return (
    <div>
      <PartyFilter
        {...filters}
        onFilterChange={(newFilters) => setFilters(newFilters)}
      />
      <PartyList filters={filters} />
    </div>
  )
}
```

## Benefits

✅ **Type-safe**: Full TypeScript support
✅ **URL sync**: Search params automatically sync with URL
✅ **Validation**: Built-in validation with TanStack Router
✅ **Default values**: Easy default value management
✅ **Shallow routing**: Updates URL without full page reload
✅ **SSR compatible**: Works with server-side rendering

## Migration from useState

### Before (useState)

```typescript
const [search, setSearch] = useState('')
const [page, setPage] = useState(1)

// Lost on page refresh ❌
// Not shareable via URL ❌
```

### After (nuqs)

```typescript
const [{ search, page }, setParams] = useQueryStates({
    search: parseAsString.withDefault(''),
    page: parseAsInteger.withDefault(1)
})

// Persisted in URL ✅
// Shareable via URL ✅
// Type-safe ✅
```

## Advanced Features

### Debounced Updates

```typescript
import { useQueryStates } from 'nuqs'
import { useDebouncedCallback } from 'use-debounce'

function SearchComponent() {
  const [{ search }, setParams] = useQueryStates(searchParams)

  const debouncedSearch = useDebouncedCallback(
    (value: string) => setParams({ search: value }),
    500
  )

  return (
    <input
      defaultValue={search}
      onChange={(e) => debouncedSearch(e.target.value)}
    />
  )
}
```

### Clear All Params

```typescript
const [params, setParams] = useQueryStates(searchParams)

// Reset to defaults
const clearFilters = () => {
    setParams({
        search: '',
        filter: 'all',
        page: 1
    })
}
```

### Conditional Params

```typescript
// Only set param if value is not default
setParams({
    search: value || null, // null removes from URL
    page: page === 1 ? null : page
})
```

## Documentation

- **nuqs Docs**: https://nuqs.47ng.com/
- **TanStack Router**: https://tanstack.com/router
- **Example File**: `src/routes/_protected/_dashboard/items.search-example.tsx`

---

**Status**: ✅ Integrated and ready to use

**Adapter**: `nuqs/adapters/tanstack-router`

**Location**: Root route (`src/routes/__root.tsx`)
