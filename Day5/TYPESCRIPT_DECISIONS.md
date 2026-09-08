# TypeScript Design Decisions

This document records important TypeScript design decisions made in the Task Manager application and the alternatives considered.

## 1. Discriminated Union for Actions

### Decision

The application represents Redux-style actions using a discriminated union based on the `type` property.

```ts
export type Action =
  | { type: "ADD_TASK"; payload: Task }
  | { type: "DELETE_TASK"; payload: string }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };
```

### Why

Each action has a specific payload type. TypeScript can use the `type` property to narrow the action and determine which payload is available.

This provides better type safety in the reducer and prevents unrelated payload types from being dispatched.

### Alternative Considered

A generic action such as:

```ts
type Action = {
  type: string;
  payload: unknown;
};
```

was considered.

However, this would require additional runtime checks and would not provide the same level of compile-time safety.

---

## 2. Partial Task Updates

### Decision

Task updates use:

```ts
Partial<Task> & { id: string };
```

### Why

An update may change only some properties of a task. `Partial<Task>` makes all task properties optional.

The task ID must always be provided, so it is added back as a required property with:

```ts
{
  id: string;
}
```

This gives flexibility while ensuring that the reducer can identify which task should be updated.

### Alternative Considered

A separate type containing every possible task property was considered:

```ts
type UpdateTask = {
  id: string;
  title?: string;
  description?: string;
  completed?: boolean;
};
```

However, this duplicates the properties already defined by `Task`. `Partial<Task>` automatically stays synchronized with the `Task` type when its properties change.

---

## 3. Generics for Reusable Utilities

### Decision

Generics are used for reusable utilities such as `Queue<T>` and `ApiClient.get<T>()`.

Examples:

```ts
class Queue<T>
```

and:

```ts
async get<T>(endpoint: string): Promise<T>
```

### Why

The queue should be able to store different types without losing type safety.

Similarly, the API client may return different response shapes depending on the endpoint. The generic type allows the caller to specify the expected response type.

For example:

```ts
const users = await apiClient.get<User[]>("/users");
```

### Alternative Considered

Using `any` was considered because it would allow the utilities to accept arbitrary values.

However, `any` removes compile-time type checking and could allow incorrect values to propagate through the application.

Generics provide flexibility while preserving type safety.

---

## 4. Record for Dynamic Route Parameters

### Decision

Route parameters are represented using:

```ts
Record<string, string>;
```

### Why

The router supports dynamic routes such as:

```text
/detail/:id
```

The parameter names are determined by the route definition, so the router cannot know every possible parameter key ahead of time.

`Record<string, string>` represents an object with dynamically named string keys and string values.

For example:

```ts
{
  id: "42";
}
```

### Alternative Considered

A fixed interface such as:

```ts
interface RouteParams {
  id: string;
}
```

was considered.

However, this would make the router specific to one route parameter. `Record<string, string>` allows the router to support different dynamic routes without changing the type definition.

---

## 5. Explicit Types for Store and Middleware

### Decision

The state management system uses explicit function and object types for the reducer, dispatch function, store, and middleware.

Examples include:

```ts
export type Dispatch = (action: Action) => void;
```

```ts
export type Reducer = (state: State, action: Action) => State;
```

and:

```ts
type Middleware = (store: {
  getState: () => State;
}) => (next: (action: Action) => void) => (action: Action) => void;
```

### Why

The state management system contains several functions that pass typed state and actions between modules.

Explicit types make these contracts clear and ensure that:

- reducers receive valid state and actions
- dispatch only accepts valid actions
- middleware receives the expected store API
- middleware forwards correctly typed actions

### Alternative Considered

The types could have been inferred entirely from the implementation.

However, relying only on inference would make the public contracts less obvious and could make the architecture harder to understand.

Explicit types document the expected interfaces between the state-management modules while allowing TypeScript to catch incorrect usage.
