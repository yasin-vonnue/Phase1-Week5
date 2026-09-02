import path from "node:path";

import { greet, add, version } from "some-library";

const greeting: string = greet("Arthur");

const sum: number = add(10, 20);

const libraryVersion: string = version;

console.log(greeting);
console.log(sum);
console.log(libraryVersion);

const filePath: string = path.join("src", "index.ts");

console.log("File path:", filePath);

const palette = {
  primary: "#0D9488",
} satisfies Record<string, string>;

console.log("Primary color:", palette.primary);

console.log("App version:", __APP_VERSION__);
