// 1. Interface merging

interface User {
  id: number;
  name: string;
}

interface User {
  email: string;
  isAdmin: boolean;
}

const user: User = {
  id: 1,
  name: "Arthur",
  email: "arthur@example.com",
  isAdmin: true,
};

console.log("User:", user);

// 2. Array declaration merging

declare global {
  interface Array<T> {
    sum(): number;
  }
}

Array.prototype.sum = function (): number {
  return this.reduce((total: number, value: number) => total + value, 0);
};

const numbers: number[] = [10, 20, 30, 40];

console.log("Sum:", numbers.sum());

// 3. Window interface augmentation

interface AppState {
  user: User | null;
  theme: "light" | "dark";
  isAuthenticated: boolean;
}

declare global {
  interface Window {
    appState: AppState;
  }
}

// This is the type used for window.appState in a browser.
const appState: AppState = {
  user,
  theme: "dark",
  isAuthenticated: true,
};

console.log("App State:", appState);

// 4. Module augmentation

import type { FictionalLibrary } from "fictional-library";

const library: FictionalLibrary = {
  existingMethod(): string {
    return "Existing method";
  },

  missingMethod(): string {
    return "Missing method added through module augmentation";
  },
};

console.log("Existing:", library.existingMethod());
console.log("Augmented:", library.missingMethod());

export {};
