# TypeScript Task Manager

A small single-page Task Manager application built with TypeScript. It demonstrates typed state management, client-side routing, reusable UI components, persistence with middleware, asynchronous task loading, and TypeScript testing.

## Features

- View and manage tasks
- Add new tasks
- Edit task titles
- Toggle task completion
- Delete tasks
- View individual task details
- Switch between light and dark themes
- Client-side SPA routing
- Persistent state using localStorage
- Typed state management with reducer and middleware
- Automated tests with Vitest
- Code coverage reporting
- ESLint validation
- Strict TypeScript checking

## Tech Stack

- **TypeScript** -application development and static type checking
- **Vite** -development server and production build
- **Vitest** -unit testing
- **jsdom** -browser-like test environment
- **ESLint** -code quality and linting
- **Node.js** -development environment
- HTML/CSS -application structure and styling

## TypeScript Features Used

### Strict Type Checking

The project uses:

"strict": true

This enables TypeScript's strict type-checking features and helps catch type errors during development.

### Type Aliases

Application data structures are represented with type aliases:

type Task = {
id: string;
title: string;
description?: string;
completed: boolean;
};

### Discriminated Unions

Actions are represented as a discriminated union using the type property:

type Action =
| { type: "ADD_TASK"; payload: Task }
| { type: "DELETE_TASK"; payload: string }
| { type: "TOGGLE_TASK"; payload: string };

This allows the reducer to safely narrow the action based on `action.type`.

### Generics

Generics are used where reusable types need to work with different data types.

Examples include:

class Queue<T>

and:

async get<T>(endpoint: string): Promise<T>

### Utility Types

`Partial<Task>` is used for task updates because an update does not require every task property:

Partial<Task> & { id: string }

This makes the update payload flexible while ensuring that the task ID is always present.

### Record

Route parameters use:

Record<string, string>

This represents an object whose keys and values are strings.

### Type-Only Imports

The project uses TypeScript type-only imports where appropriate:

import type { Action, State } from "./types.js";

This makes it clear that the import is needed only for type checking and does not represent a runtime dependency.

### Project Structure

Day5/
├── docs/
├── src/
│ ├── components/
│ │ ├── Button.ts
│ │ ├── Card.ts
│ │ └── Modal.ts
│ │
│ ├── pages/
│ │ ├── Detail.ts
│ │ ├── Home.ts
│ │ ├── List.ts
│ │ └── Settings.ts
│ │
│ ├── state/
│ │ ├── initialState.ts
│ │ ├── reducer.ts
│ │ ├── storageMiddleware.ts
│ │ ├── store.ts
│ │ ├── taskActions.ts
│ │ └── types.ts
│ │
│ ├── types/
│ │
│ ├── utils/
│ │ ├── ApiClient.ts
│ │ ├── Queue.ts
│ │ └── helpers.ts
│ │
│ ├── migration-errors-demo.ts
│ └── main.ts
│
├── tests/
│ ├── ApiClient.test.ts
│ ├── Home.test.ts
│ ├── List.test.ts
│ ├── Queue.test.ts
│ ├── reducer.test.ts
│ ├── router.test.ts
│ ├── stateManager.test.ts
│ └── store.test.ts
│
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.mjs
├── vitest.config.mjs
├── eslint.config.mjs
├── ARCHITECTURE.md
└── TYPESCRIPT_DECISIONS.md

### How to Run

#### Install dependencies

npm install

#### Start the development server

npm run dev

Vite will start the development server and provide a local URL.

#### Build for production

npm run build

#### Preview the production build

npm run preview

#### How to Test

Run Vitest in watch mode:

npm test

Run the complete test suite once:

npm run test:run

The current test suite contains 32 tests across 8 test files.

#### How to Check Coverage

npm run coverage

The project currently achieves approximately 85% statement and line coverage.

#### How to Type-Check

Run TypeScript without generating output:

npx tsc --noEmit

For a strict type-check:

npx tsc --strict --noEmit

#### How to Lint

npm run lint

#### Development Scripts

npm run dev -Start the Vite development server

npm run build -Create a production build

npm run preview -Preview the production build

npm test -Run Vitest in watch mode

npm run test:run -Run tests once

npm run coverage -Run tests with coverage

npm run lint -Run ESLint

### Architecture

The application follows a small SPA architecture with separate responsibilities for routing, UI pages/components, state management, persistence, and utilities.

See ARCHITECTURE.md for the component and module diagram.

### TypeScript Design Decisions

The project's major TypeScript decisions and alternatives considered are documented in TYPESCRIPT_DECISIONS.md.

### Testing

The application uses Vitest with a jsdom environment for testing browser-oriented functionality.

Tests cover:

- Router behaviour
- State management
- Reducer behavior
- Page rendering
- Queue functionality
- API client behavior
- Task-related UI behavior

### License

This project was created as part of a TypeScript learning and training exercise.
