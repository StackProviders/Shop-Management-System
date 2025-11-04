# AI Rules & Guidelines

This directory contains comprehensive rules and patterns for AI assistants working on this project.

## 📚 Documentation Structure

### Core Rules

- **[01-project-standards.md](./01-project-standards.md)** - Project-wide standards and conventions
- **[02-architecture-patterns.md](./02-architecture-patterns.md)** - Architecture and feature patterns
- **[03-component-patterns.md](./03-component-patterns.md)** - Reusable component patterns
- **[04-state-management.md](./04-state-management.md)** - State management with ReactFire & Zustand

### Development Guides

- **[05-quick-start.md](./05-quick-start.md)** - Quick reference for common tasks
- **[06-feature-development.md](./06-feature-development.md)** - Step-by-step feature creation
- **[07-data-display.md](./07-data-display.md)** - DataTable & DataGrid patterns
- **[08-responsive-design.md](./08-responsive-design.md)** - Mobile & desktop patterns

### Advanced Topics

- **[09-performance.md](./09-performance.md)** - Performance optimization
- **[10-testing.md](./10-testing.md)** - Testing strategies
- **[11-migration.md](./11-migration.md)** - Migration from old patterns

## 🎯 Quick Reference

### Package Manager

**ALWAYS use `pnpm`** - Never npm, yarn, or other package managers.

### Import Pattern

```typescript
// ✅ CORRECT - Import from feature roots
import { useAuthActions } from '@/features/auth'
import { ListDetailPage } from '@/components/common'

// ❌ WRONG - Don't import from internal paths
import { useAuthActions } from '@/features/auth/hooks/use-auth-actions'
```

### Component Priority

1. **Common components** (`@/components/common/*`) - Use first
2. **shadcn/ui components** (`@/components/ui/*`) - Use second
3. **Custom components** (`@/components/*`) - Use when needed
4. **Create new** - Only when absolutely necessary

### Responsive Design

**ALWAYS** design for both desktop and mobile using `useIsMobile()` hook.

## 🚀 Getting Started

1. Read **[01-project-standards.md](./01-project-standards.md)** for core rules
2. Read **[05-quick-start.md](./05-quick-start.md)** for common patterns
3. Reference specific guides as needed

## 📖 Related Documentation

- **[/docs/ARCHITECTURE.md](../ARCHITECTURE.md)** - Complete architecture guide
- **[/docs/FEATURES.md](../FEATURES.md)** - Feature documentation
- **[/docs/implementation/](../implementation/)** - Implementation guides
- **[/docs/guides/](../guides/)** - User guides

## 🔄 Updates

This documentation replaces the old `.amazonq/rules/` directory with a more comprehensive and organized structure.

**Last Updated**: 2024
**Version**: 2.0
