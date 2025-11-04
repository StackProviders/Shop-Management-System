# Shop Management System

A modern, scalable shop management application built with Tauri, React, TypeScript, and Tailwind CSS. Designed for both **desktop and mobile** platforms with responsive UI/UX.

[![NPM Version](https://img.shields.io/npm/v/create-tauri-react)](https://www.npmjs.com/package/create-tauri-react)
[![NPM Downloads](https://img.shields.io/npm/dm/create-tauri-react)](https://www.npmjs.com/package/create-tauri-react)

> **📦 Package Manager:** This project uses **pnpm** exclusively. Always use `pnpm` for all operations.

## ✨ Recent Updates

### Scalable Architecture & Comprehensive Documentation (v2.0)

Migrated to a new scalable architecture with **85% code reduction** per feature and comprehensive documentation.

**Key Improvements**:

- 🏗️ **Reusable Components**: ListDetailPage, VirtualizedList, CrudForm
- 🔄 **Shared Hooks**: useCrudOperations, useSearchFilter
- 📦 **Common Patterns**: Consistent architecture across features
- 🎯 **ReactFire Integration**: Real-time data with Firestore
- 📚 **Comprehensive AI Rules**: 11 detailed guides in `/docs/ai-rules/`
- 🚀 **90% Less Boilerplate**: Faster feature development

### Feature-Based Architecture

The application follows the **bulletproof-react** architecture pattern for better scalability and maintainability.

**Key Features**:

- 🏗️ Feature-based organization (auth, shop, items, parties, shared)
- 🔄 Reusable hooks and utilities
- 📦 Clean barrel exports for easy imports
- 🎯 Separation of concerns (API, hooks, components, types)
- ♻️ Backward compatible - old imports still work
- 📚 Comprehensive documentation

## 📖 Documentation

### Main Documentation

- **[/docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Complete architecture guide
- **[/docs/FEATURES.md](./docs/FEATURES.md)** - Features documentation
- **[/docs/PROJECT_SUMMARY.md](./docs/PROJECT_SUMMARY.md)** - Project summary

### AI Rules & Patterns (NEW!)

- **[/docs/ai-rules/README.md](./docs/ai-rules/README.md)** - AI rules index
- **[/docs/ai-rules/01-project-standards.md](./docs/ai-rules/01-project-standards.md)** - Standards & conventions
- **[/docs/ai-rules/02-architecture-patterns.md](./docs/ai-rules/02-architecture-patterns.md)** - Architecture patterns
- **[/docs/ai-rules/05-quick-start.md](./docs/ai-rules/05-quick-start.md)** - Quick reference
- **[/docs/ai-rules/06-feature-development.md](./docs/ai-rules/06-feature-development.md)** - Feature creation guide

### Implementation Guides

- **[/docs/implementation/REFACTORING_COMPLETE.md](./docs/implementation/REFACTORING_COMPLETE.md)** - What was implemented
- **[/docs/implementation/MIGRATION_COMPLETE.md](./docs/implementation/MIGRATION_COMPLETE.md)** - Migration summary
- **[/docs/implementation/QUICK_START.md](./docs/implementation/QUICK_START.md)** - Quick start guide

### Component Refactoring (NEW!)

- **[/docs/REFACTORING_SUMMARY.md](./docs/REFACTORING_SUMMARY.md)** - Refactoring overview
- **[/docs/REFACTORING_GUIDE.md](./docs/REFACTORING_GUIDE.md)** - Detailed migration guide
- **[/docs/COMPONENT_QUICK_REFERENCE.md](./docs/COMPONENT_QUICK_REFERENCE.md)** - Quick reference
- **[/docs/COMPONENT_CLEANUP_TODO.md](./docs/COMPONENT_CLEANUP_TODO.md)** - Remaining tasks

### User Guides

- **[/docs/guides/data-table.md](./docs/guides/data-table.md)** - DataTable usage
- **[/docs/guides/data-grid.md](./docs/guides/data-grid.md)** - DataGrid usage
- **[/docs/guides/list-detail-layout.md](./docs/guides/list-detail-layout.md)** - List-detail pattern

## 🚀 Quick Start

### Installation & Development

```bash
# Install dependencies (ALWAYS use pnpm)
pnpm install

# Run desktop development
pnpm tauri dev

# Run Android development
pnpm tauri:android

# Run iOS development
pnpm tauri:ios

# Build for production
pnpm tauri build
```

### Authentication

```typescript
import { useAuthActions, LoginForm } from '@/features/auth'

function App() {
  const { logout } = useAuthActions()
  return <LoginForm onSuccess={() => navigate('/shops')} />
}
```

### Shop Management

```typescript
import { useShopContext, ShopProvider } from '@/features/shop'

function ShopDashboard() {
  const { currentShop, userShops } = useShopContext()
  return <div>{currentShop?.shopName}</div>
}
```

### Responsive UI (Desktop & Mobile)

```typescript
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

function ResponsiveModal() {
  const isMobile = useIsMobile()

  if (isMobile) {
    return <Drawer><DrawerContent>Mobile View</DrawerContent></Drawer>
  }

  return <Dialog><DialogContent>Desktop View</DialogContent></Dialog>
}
```

### Shared Utilities

```typescript
import { useDebounce, formatDate, isValidEmail } from '@/features/shared'

const debouncedSearch = useDebounce(searchTerm, 500)
const formatted = formatDate(new Date())
const valid = isValidEmail('test@example.com')
```

## 📁 Project Structure

```
src/
├── features/              # Feature modules (NEW!)
│   ├── auth/             # Authentication
│   ├── shop/             # Shop management
│   └── shared/           # Shared utilities
├── app/                  # Application layer
├── components/           # Shared UI components
├── hooks/                # Global hooks
├── lib/                  # Library configs
├── services/             # Backend services
└── stores/               # State management
```

## 🎯 Features

### Authentication

- ✅ Email/Phone OTP authentication
- ✅ Device trust management
- ✅ Profile management
- ✅ Auto-login with trusted devices

### Shop Management

- ✅ Multi-shop support
- ✅ Role-based access control (Owner, Admin, Manager, Staff, Viewer)
- ✅ Member management
- ✅ Permission system
- ✅ Shop CRUD operations

### Shared Utilities

- ✅ Debounce hook
- ✅ Async state management
- ✅ Local storage hook
- ✅ Validation utilities
- ✅ Format utilities (date, currency, phone)

## 🛠️ Tech Stack

### Core

- **[Tauri](https://tauri.app)** - Desktop & mobile application framework
- **[React 19](https://reactjs.org)** - UI library
- **[TypeScript](https://typescriptlang.org)** - Type safety
- **[Vite](https://vitejs.dev)** - Build tool

### UI/UX

- **[Tailwind CSS v4](https://tailwindcss.com)** - Utility-first styling
- **[shadcn/ui](https://ui.shadcn.com/)** - High-quality UI components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible primitives
- **[Lucide Icons](https://lucide.dev/)** - Icon library
- **[Vaul](https://vaul.emilkowal.ski/)** - Drawer component

### State & Data

- **[SWR](https://swr.vercel.app/)** - Data fetching & caching
- **[Zustand](https://zustand-demo.pmnd.rs/)** - State management
- **[React Hook Form](https://react-hook-form.com/)** - Form handling
- **[Zod](https://zod.dev/)** - Schema validation

### Backend

- **[Firebase](https://firebase.google.com/)** - Backend services
- **[Firestore](https://firebase.google.com/docs/firestore)** - Database

### Development

- **[ESLint 9](https://eslint.org/)** - Linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Vitest](https://vitest.dev/)** - Testing
- **[Husky](https://typicode.github.io/husky/)** - Git hooks

## 📦 Available Scripts

```bash
# Development
pnpm tauri dev              # Desktop development
pnpm tauri:android          # Android development
pnpm tauri:ios              # iOS development
pnpm tauri:desktop-android  # Desktop + Android simultaneously
pnpm tauri:desktop-ios      # Desktop + iOS simultaneously

# Building
pnpm build                  # Build web assets
pnpm tauri build            # Build desktop app

# Code Quality
pnpm lint                   # Run ESLint
pnpm format                 # Format with Prettier
pnpm test                   # Run tests
pnpm test:ui                # Run tests with UI
pnpm test:coverage          # Run tests with coverage

# Maintenance
pnpm clean:deps             # Remove node_modules
pnpm clean:build            # Remove dist folder
pnpm clean:rust             # Clean Rust build
pnpm clean:all              # Clean everything
```

## 🏗️ Architecture

The architecture is based on practices suggested by [@alan2207](https://github.com/alan2207) in his [bulletproof-react](https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md).

### Feature Structure

```
src/features/awesome-feature
|
+-- api         # API request declarations and api hooks
+-- assets      # Static files for the feature
+-- components  # Feature-specific components
+-- hooks       # Feature-specific hooks
+-- stores      # Feature-specific state stores
+-- types       # TypeScript types
+-- utils       # Utility functions
+-- index.ts    # Barrel export for clean imports
```

### Key Principles

1. **Feature Isolation**: Each feature is self-contained
2. **Separation of Concerns**: API, hooks, components, types are separated
3. **Responsive Design**: All components work on desktop and mobile
4. **Type Safety**: TypeScript everywhere
5. **Reusability**: Shared code in `features/shared/`

### Import Pattern

```typescript
// ✅ CORRECT - Import from feature root
import { useAuthActions, LoginForm } from '@/features/auth'
import { useShopContext } from '@/features/shop'

// ❌ WRONG - Don't import from internal paths
import { useAuthActions } from '@/features/auth/hooks/use-auth-actions'
```

### Component Priority

1. **Common components** (`@/components/common/*`) - Use FIRST
2. **shadcn/ui components** (`@/components/ui/*`) - Use SECOND
3. **Custom components** (`@/components/*`) - Use when needed
4. **Create new** - Only when absolutely necessary

### Responsive Design

- Use `useIsMobile()` hook to detect screen size
- Mobile breakpoint: 768px
- Use Tailwind responsive classes: `sm:`, `md:`, `lg:`
- Prefer `Drawer` for mobile, `Dialog` for desktop

## 🎨 UI Components

### Available shadcn/ui Components

**Layout**: Card, Sheet, Dialog, Drawer, Tabs, Accordion, Separator, Sidebar

**Forms**: Input, Button, Select, Checkbox, Label, Form, PhoneInput, InputOTP

**Navigation**: DropdownMenu, Command, Popover

**Feedback**: Alert, AlertDialog, Spinner, Skeleton, Sonner (toast)

**Data Display**: Table, Pagination, Avatar, Badge, Typography

**Utility**: Tooltip, ScrollArea, AspectRatio, Calendar

### Button Variants

```typescript
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

<Button size="xs">Extra Small</Button>
<Button size="sm">Small</Button>
<Button size="md">Medium (default)</Button>
<Button size="lg">Large</Button>

<SubmitButton loading={isLoading}>Submit</SubmitButton>
```

### Responsive Modal Example

```typescript
import { useIsMobile } from '@/hooks/use-mobile'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { Drawer, DrawerContent } from '@/components/ui/drawer'

function MyModal({ open, onOpenChange, children }) {
  const isMobile = useIsMobile()

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>{children}</DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
```

## 🧪 Testing

```bash
pnpm test              # Run tests
pnpm test:ui           # Run tests with UI
pnpm test:coverage     # Run tests with coverage
```

## 🔧 Development Tools

### Code Quality

- **ESLint 9**: Flat config for modern linting
- **Prettier**: Automatic code formatting
- **Husky**: Git hooks for pre-commit checks
- **Lint-staged**: Run linters on staged files only

### AI Assistant Rules

This project includes comprehensive AI-friendly rules in `/docs/ai-rules/`:

- **11 comprehensive guides** covering all aspects of development
- **Quick reference** for common tasks
- **Architecture patterns** and best practices
- **Component patterns** and reusable code
- **Feature development** step-by-step guides

These rules help AI assistants understand the project structure and generate consistent, high-quality code.

## 🎯 Best Practices

### Code Style

- Use TypeScript with proper types (avoid `any`)
- Extract business logic into custom hooks
- Keep components focused on UI
- Use `cn()` utility to merge Tailwind classes
- Write self-documenting code (minimize comments)

### State Management

- **Local state**: `useState`, `useReducer`
- **Server state**: ReactFire with Firestore (real-time)
- **Mutations**: Shared `useCrudOperations` hook
- **UI state**: Zustand (for UI state only)
- **Form state**: React Hook Form with Zod validation

See **[/docs/ai-rules/04-state-management.md](./docs/ai-rules/04-state-management.md)** for complete guide

### Error Handling

```typescript
import { toast } from 'sonner'

try {
    await createShop(data)
    toast.success('Shop created successfully')
} catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    toast.error(message)
}
```

### Performance

- Use `React.lazy()` for code splitting
- Debounce search inputs with `useDebounce`
- Memoize expensive calculations with `useMemo`
- Memoize callbacks with `useCallback`

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Use pnpm** for all package operations
2. Follow the feature-based architecture
3. Write TypeScript with proper types
4. Ensure responsive design (desktop & mobile)
5. Use shadcn/ui components when possible
6. Write tests for new features
7. Run `pnpm lint` and `pnpm format` before committing
8. Follow conventional commit messages

## 📱 Platform Support

- ✅ **Desktop**: Windows, macOS, Linux
- ✅ **Mobile**: Android, iOS
- ✅ **Responsive UI**: Adapts to all screen sizes

## 🔐 Security

- OTP-based authentication
- Device trust management
- Role-based access control (RBAC)
- Permission system for shop operations
- Input validation with Zod schemas
