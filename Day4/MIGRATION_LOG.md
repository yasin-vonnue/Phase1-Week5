# TypeScript Migration Log

## Task 2 - Common Migration Errors & Fixes

### 1. Property does not exist on type

**Error pattern:**

`Property 'email' does not exist on type 'User'.`

**Cause:**

The property was accessed but was not declared in the `User` type.

**Fix:**

Added the missing property to the type definition.

```ts
type User = {
  name: string;
  email: string;
};
```

### 2. Object is possibly null

**Error pattern:**

` 'element' is possibly 'null'.`

**Cause:**

DOM query methods such as `querySelector()` can return `null` when the element does not exist.

**Fix:**

Added an explicit null check.

```ts
const element = document.querySelector("#app");

if (!element) {
  throw new Error("App element not found");
}
```

### 3. Argument of type X is not assignable to Y

**Error pattern:**

` Argument of type 'number' is not assignable to parameter of type 'string'.`

**Cause:**

A function expected a string but received a number.

**Fix:**

Passed the correct type to the function.

```ts
function greet(name: string): string {
  return `Hello ${name}`;
}

greet("Yasin");
```

## Task 2 -
