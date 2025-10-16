# Testing Guide - Shop Management System

## Overview

Comprehensive testing setup using Vitest, React Testing Library, and modern testing tools.

## Tools Installed

### Core Testing

- **Vitest** - Fast unit test framework (Vite-native)
- **@testing-library/react** - React component testing
- **@testing-library/jest-dom** - Custom matchers
- **@testing-library/user-event** - User interaction simulation
- **happy-dom** - Fast DOM implementation

### UI Testing

- **@vitest/ui** - Visual test runner UI

## Quick Start

### Run Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm test:coverage
```

### Test Structure

```
src/
├── test/
│   ├── setup.ts           # Global test setup
│   └── auth.test.tsx      # Auth store tests
├── components/
│   └── __tests__/         # Component tests
├── services/
│   └── __tests__/         # Service tests
└── stores/
    └── __tests__/         # Store tests
```

## Writing Tests

### 1. Component Tests

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoginForm } from '@/components/auth/auth-forms'

describe('LoginForm', () => {
    it('should render email input', () => {
        render(<LoginForm />)
        expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    })
})
```

### 2. Store Tests

```typescript
import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '@/stores/auth-store'

describe('Auth Store', () => {
    beforeEach(() => {
        useAuthStore.getState().reset()
    })

    it('should set user', () => {
        const user = { uid: '123', email: 'test@test.com' }
        useAuthStore.getState().setUser(user)
        expect(useAuthStore.getState().user).toEqual(user)
    })
})
```

### 3. Service Tests

```typescript
import { describe, it, expect, vi } from 'vitest'
import { logout } from '@/services/auth/auth.service'

describe('Auth Service', () => {
    it('should clear session on logout', async () => {
        await logout()
        // Assert session cleared
    })
})
```

### 4. Integration Tests

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Login Flow', () => {
    it('should login user with OTP', async () => {
        const user = userEvent.setup()
        render(<LoginForm />)

        await user.type(screen.getByLabelText(/email/i), 'test@test.com')
        await user.click(screen.getByRole('button', { name: /continue/i }))

        await waitFor(() => {
            expect(screen.getByText(/we sent a code/i)).toBeInTheDocument()
        })
    })
})
```

## Test Coverage

### Run Coverage Report

```bash
pnpm test:coverage
```

### Coverage Output

- **Text** - Console output
- **HTML** - `coverage/index.html`
- **JSON** - `coverage/coverage-final.json`

### Coverage Goals

- **Statements**: 80%+
- **Branches**: 75%+
- **Functions**: 80%+
- **Lines**: 80%+

## Testing Best Practices

### 1. Test Behavior, Not Implementation

```typescript
// ❌ Bad - Testing implementation
expect(component.state.count).toBe(1)

// ✅ Good - Testing behavior
expect(screen.getByText('Count: 1')).toBeInTheDocument()
```

### 2. Use User-Centric Queries

```typescript
// ❌ Bad
screen.getByTestId('submit-button')

// ✅ Good
screen.getByRole('button', { name: /submit/i })
```

### 3. Mock External Dependencies

```typescript
import { vi } from 'vitest'

vi.mock('@/services/auth', () => ({
    logout: vi.fn()
}))
```

### 4. Clean Up After Tests

```typescript
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => {
    cleanup()
})
```

## Auth System Tests

### Current Tests

1. **Auth Store Tests** (`src/test/auth.test.tsx`)
    - ✅ Initialize with unauthenticated state
    - ✅ Set user and mark as authenticated
    - ✅ Reset state on logout
    - ✅ Set loading state
    - ✅ Set error state

### Recommended Tests

#### Auth Service

```typescript
describe('Auth Service', () => {
    it('should send OTP')
    it('should verify OTP')
    it('should trust device after OTP')
    it('should auto-login with trusted device')
    it('should logout and clear session')
    it('should logout and revoke device')
})
```

#### Auth Guard

```typescript
describe('Auth Guard', () => {
    it('should redirect unauthenticated users to /auth')
    it('should redirect authenticated users to /shops')
    it('should show loading spinner while loading')
    it('should render children when authenticated')
})
```

#### Login Form

```typescript
describe('Login Form', () => {
    it('should render email input')
    it('should send OTP on submit')
    it('should show OTP input after sending')
    it('should verify OTP and login')
    it('should show error on invalid OTP')
})
```

## Debugging Tests

### 1. Debug Single Test

```typescript
import { screen } from '@testing-library/react'

it('should render', () => {
    render(<Component />)
    screen.debug() // Prints DOM
})
```

### 2. Debug Specific Element

```typescript
const element = screen.getByRole('button')
console.log(element.outerHTML)
```

### 3. Use Vitest UI

```bash
pnpm test:ui
```

Opens browser with interactive test runner.

## CI/CD Integration

### GitHub Actions

```yaml
name: Tests
on: [push, pull_request]
jobs:
    test:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v3
            - uses: pnpm/action-setup@v2
            - run: pnpm install
            - run: pnpm test
            - run: pnpm test:coverage
```

## Additional Tools (Optional)

### Playwright (E2E Testing)

```bash
pnpm add -D @playwright/test
```

### MSW (API Mocking)

```bash
pnpm add -D msw
```

### Storybook (Component Development)

```bash
pnpm dlx storybook@latest init
```

## Troubleshooting

### Issue: Tests timeout

**Solution**: Increase timeout in `vitest.config.ts`

```typescript
test: {
    testTimeout: 10000
}
```

### Issue: Module not found

**Solution**: Check path aliases in `vitest.config.ts`

```typescript
resolve: {
    alias: {
        '@': path.resolve(__dirname, './src')
    }
}
```

### Issue: DOM not available

**Solution**: Ensure `environment: 'happy-dom'` in config

## Summary

✅ **Vitest** - Fast, modern test runner
✅ **React Testing Library** - Component testing
✅ **Happy DOM** - Fast DOM implementation
✅ **Coverage Reports** - Track test coverage
✅ **UI Test Runner** - Visual test debugging
✅ **User Event** - Realistic user interactions

Run `pnpm test:ui` to start testing! 🚀
