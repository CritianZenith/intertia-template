# Inertia.js Navigation with HeroUI Components

This document outlines best practices for using Inertia.js navigation with HeroUI components to prevent full page reloads.

## Problem

When using HeroUI components with Inertia.js, nesting Button components inside Link components can cause full page reloads instead of using Inertia's SPA navigation:

```tsx
// ❌ Causes full page reloads - DO NOT USE
<Link href="/accounts">
  <Button variant="light">Back to accounts</Button>
</Link>
```

## Solution

Use HeroUI's `as` prop to render the Button as an Inertia Link component:

```tsx
// ✅ Correctly uses Inertia navigation
<Button as={Link} href="/accounts" variant="light">
  Back to accounts
</Button>
```

## Navigation Patterns

### Buttons as Links

```tsx
// Navigation buttons
<Button as={Link} href="/accounts" variant="light">
  Back to accounts
</Button>
```

### Breadcrumbs

```tsx
<Breadcrumbs className="mb-6">
  <BreadcrumbItem>
    <Link href="/accounts">Accounts</Link>
  </BreadcrumbItem>
  <BreadcrumbItem>New</BreadcrumbItem>
</Breadcrumbs>
```

### Delete Actions

Use Inertia's router directly for delete operations:

```tsx
import { router } from "@inertiajs/react";

<Button
  onPress={() => {
    if (confirm("Are you sure you want to delete this account?")) {
      router.delete(`/accounts/${account.id}`);
    }
  }}
  color="danger"
  variant="light"
>
  Delete
</Button>;
```

### Forms

For form submissions, use Inertia's form helpers:

```tsx
import { useForm } from "@inertiajs/react";

const form = useForm({
  name: account.name,
});

<Form
  onSubmit={() => {
    form.transform((data) => ({ account: data }));
    form.patch(`/accounts/${account.id}`);
  }}
  submitText="Update Account"
/>;
```

## Important Notes

1. Always use `onPress` instead of `onClick` for HeroUI Button components
2. Import the Link component from `@inertiajs/react`, not from `@heroui/react`
3. For programmatic navigation, use `router.visit()` from Inertia.js
