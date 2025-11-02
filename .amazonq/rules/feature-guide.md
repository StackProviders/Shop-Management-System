# Feature Development Guide

## Creating a New Feature

### Step 1: Create Feature Directory

```bash
mkdir -p src/features/my-feature/{api,components,hooks,types,utils}
```

### Step 2: Define Types

Create `src/features/my-feature/types/index.ts`:

```typescript
export interface MyFeatureItem {
    id: string
    name: string
    description?: string
    createdAt: Date
    updatedAt: Date
}

export interface CreateMyFeatureItemData {
    name: string
    description?: string
}

export interface UpdateMyFeatureItemData {
    name?: string
    description?: string
}
```

### Step 3: Create API Layer

Create `src/features/my-feature/api/my-feature.api.ts`:

```typescript
import {
    MyFeatureItem,
    CreateMyFeatureItemData,
    UpdateMyFeatureItemData
} from '../types'

export const myFeatureApi = {
    getAll: async (): Promise<MyFeatureItem[]> => {
        // API call implementation
    },

    getById: async (id: string): Promise<MyFeatureItem> => {
        // API call implementation
    },

    create: async (data: CreateMyFeatureItemData): Promise<MyFeatureItem> => {
        // API call implementation
    },

    update: async (
        id: string,
        data: UpdateMyFeatureItemData
    ): Promise<MyFeatureItem> => {
        // API call implementation
    },

    delete: async (id: string): Promise<void> => {
        // API call implementation
    }
}
```

### Step 4: Create Hooks

Create `src/features/my-feature/hooks/use-my-feature-items.ts`:

```typescript
import useSWR from 'swr'
import { myFeatureApi } from '../api/my-feature.api'
import { MyFeatureItem } from '../types'

export function useMyFeatureItems() {
    const { data, error, isLoading, mutate } = useSWR<MyFeatureItem[]>(
        '/my-feature/items',
        myFeatureApi.getAll
    )

    return {
        items: data ?? [],
        isLoading,
        error,
        refresh: mutate
    }
}
```

Create `src/features/my-feature/hooks/use-my-feature-actions.ts`:

```typescript
import { useState } from 'react'
import { toast } from 'sonner'
import { myFeatureApi } from '../api/my-feature.api'
import { CreateMyFeatureItemData, UpdateMyFeatureItemData } from '../types'

export function useMyFeatureActions() {
    const [loading, setLoading] = useState(false)

    const createItem = async (data: CreateMyFeatureItemData) => {
        setLoading(true)
        try {
            const item = await myFeatureApi.create(data)
            toast.success('Item created successfully')
            return item
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to create item'
            toast.error(message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const updateItem = async (id: string, data: UpdateMyFeatureItemData) => {
        setLoading(true)
        try {
            const item = await myFeatureApi.update(id, data)
            toast.success('Item updated successfully')
            return item
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to update item'
            toast.error(message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    const deleteItem = async (id: string) => {
        setLoading(true)
        try {
            await myFeatureApi.delete(id)
            toast.success('Item deleted successfully')
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Failed to delete item'
            toast.error(message)
            throw error
        } finally {
            setLoading(false)
        }
    }

    return {
        createItem,
        updateItem,
        deleteItem,
        loading
    }
}
```

### Step 5: Create Components

Create `src/features/my-feature/components/my-feature-list.tsx`:

```typescript
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Empty } from '@/components/ui/empty'
import { useMyFeatureItems } from '../hooks/use-my-feature-items'

export function MyFeatureList() {
  const { items, isLoading, error } = useMyFeatureItems()

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-20 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <Card className="p-6">
        <p className="text-destructive">Error loading items</p>
      </Card>
    )
  }

  if (items.length === 0) {
    return (
      <Empty
        title="No items found"
        description="Create your first item to get started"
      />
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => (
        <Card key={item.id} className="p-4">
          <h3 className="font-semibold">{item.name}</h3>
          {item.description && (
            <p className="text-sm text-muted-foreground mt-1">
              {item.description}
            </p>
          )}
        </Card>
      ))}
    </div>
  )
}
```

Create `src/features/my-feature/components/my-feature-form.tsx`:

```typescript
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { SubmitButton } from '@/components/ui/button'
import { useMyFeatureActions } from '../hooks/use-my-feature-actions'

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().optional()
})

type FormData = z.infer<typeof formSchema>

interface MyFeatureFormProps {
  onSuccess?: () => void
}

export function MyFeatureForm({ onSuccess }: MyFeatureFormProps) {
  const { createItem } = useMyFeatureActions()

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: ''
    }
  })

  const onSubmit = async (data: FormData) => {
    await createItem(data)
    form.reset()
    onSuccess?.()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description (Optional)</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Enter description" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton loading={form.formState.isSubmitting}>
          Create Item
        </SubmitButton>
      </form>
    </Form>
  )
}
```

### Step 6: Create Barrel Export

Create `src/features/my-feature/index.ts`:

```typescript
// API
export * from './api/my-feature.api'

// Hooks
export * from './hooks/use-my-feature-items'
export * from './hooks/use-my-feature-actions'

// Components
export * from './components/my-feature-list'
export * from './components/my-feature-form'

// Types
export * from './types'
```

### Step 7: Add to Features Index

Update `src/features/index.ts`:

```typescript
export * as MyFeature from './my-feature'
```

### Step 8: Create Route

Create `src/app/routes/my-feature.tsx`:

```typescript
import { MyFeatureList, MyFeatureForm } from '@/features/my-feature'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Plus } from 'lucide-react'

export default function MyFeaturePage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Feature</h1>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2" />
              Create New
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Item</DialogTitle>
            </DialogHeader>
            <MyFeatureForm />
          </DialogContent>
        </Dialog>
      </div>

      <MyFeatureList />
    </div>
  )
}
```

### Step 9: Add Route to Router

Update `src/app/router.tsx`:

```typescript
import MyFeaturePage from './routes/my-feature'

// Add to routes
{
  path: '/my-feature',
  element: <MyFeaturePage />
}
```

## Feature Checklist

- [ ] Types defined in `types/index.ts`
- [ ] API layer in `api/*.api.ts`
- [ ] Data fetching hooks in `hooks/use-*-items.ts`
- [ ] Action hooks in `hooks/use-*-actions.ts`
- [ ] List component with loading/error/empty states
- [ ] Form component with validation
- [ ] Responsive design (mobile & desktop)
- [ ] Error handling with toast notifications
- [ ] Barrel export in `index.ts`
- [ ] Route created and added to router
- [ ] Tests written (optional but recommended)

## Testing Your Feature

Create `src/features/my-feature/__tests__/my-feature.test.tsx`:

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import { MyFeatureList } from '../components/my-feature-list'

describe('MyFeatureList', () => {
  it('renders loading state', () => {
    render(<MyFeatureList />)
    expect(screen.getByTestId('skeleton')).toBeInTheDocument()
  })

  it('renders items when loaded', async () => {
    // Mock API response
    vi.mock('../api/my-feature.api', () => ({
      myFeatureApi: {
        getAll: vi.fn().mockResolvedValue([
          { id: '1', name: 'Item 1' }
        ])
      }
    }))

    render(<MyFeatureList />)

    await waitFor(() => {
      expect(screen.getByText('Item 1')).toBeInTheDocument()
    })
  })
})
```

## Common Patterns

### Pagination

```typescript
export function useMyFeatureItems(page: number = 1, limit: number = 10) {
    const { data, error, isLoading } = useSWR(
        `/my-feature/items?page=${page}&limit=${limit}`,
        () => myFeatureApi.getAll(page, limit)
    )

    return {
        items: data?.items ?? [],
        total: data?.total ?? 0,
        isLoading,
        error
    }
}
```

### Search/Filter

```typescript
import { useDebounce } from '@/features/shared'

export function useMyFeatureSearch(query: string) {
    const debouncedQuery = useDebounce(query, 500)

    const { data, error, isLoading } = useSWR(
        debouncedQuery ? `/my-feature/search?q=${debouncedQuery}` : null,
        () => myFeatureApi.search(debouncedQuery)
    )

    return {
        results: data ?? [],
        isLoading,
        error
    }
}
```
