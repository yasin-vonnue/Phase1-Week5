// 1. IsArray<T>
type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<string[]>;
type Test2 = IsArray<number>;

console.log("IsArray<string[]>:", true);
console.log("IsArray<number>:", false);

// 2. Flatten<T>
type Flatten<T> = T extends Array<infer Item> ? Item : T;

type StringItem = Flatten<string[]>;
type NumberItem = Flatten<number>;

const stringValue: StringItem = "Arthur";
const numberValue: NumberItem = 25;

console.log(stringValue);
console.log(numberValue);

// 3. Recursive Awaited<T>
type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;

type Result1 = MyAwaited<Promise<string>>;
type Result2 = MyAwaited<Promise<Promise<number>>>;
type Result3 = MyAwaited<boolean>;

const result1: Result1 = "Hello";
const result2: Result2 = 100;
const result3: Result3 = true;

console.log(result1);
console.log(result2);
console.log(result3);

// 4. Parameters<T>
type MyParameters<T> = T extends (...args: infer P) => unknown ? P : never;

// ReturnType<T>
type MyReturnType<T> = T extends (...args: never[]) => infer R ? R : never;

// Test Parameters
function createUser(name: string, age: number): boolean {
  return age >= 18;
}

type UserParameters = MyParameters<typeof createUser>;

const parameters: UserParameters = ["Arthur", 35];

console.log(parameters);

// Test ReturnType
type UserReturn = MyReturnType<typeof createUser>;

const returnValue: UserReturn = true;

console.log(returnValue);

// 5. Examples from TypeScript's built-in utility types

// Partial<T>
type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

// Required<T>
type MyRequired<T> = {
  [K in keyof T]-?: T[K];
};

// Readonly<T>
type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

// Pick<T, K>
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Record<K, T>
type MyRecord<K extends keyof any, T> = {
  [P in K]: T;
};
