//string

const username: string = "Arthur";

// Number

const age: number = 25;
const price: number = 99.99;

//Boolean

const isLoggedIn: boolean = true;

//Null

const emptyValue: null = null;

//Undefined

const notAssigned: undefined = undefined;

//Symbol

const uniqueId: symbol = Symbol("id");

//BigInt

const largeNumber: bigint = 9007199254740991n;

//Any

let flexibleValue: any = "Hello";

flexibleValue = 123;
flexibleValue = true;

//Replacing Any with a better type

// let flexibleValue: string | number = "Hello";

// flexibleValue = 123;

// flexibleValue = true; this would produce an error

//Unknow is safer than any

let userInput: unknown = "Hello";

userInput = 42;
userInput = true;

// Never: represent something that never successfully produces a value

function throwError(message: string): never {
  throw new Error(message);
}

function infiniteLoop(): never {
  while (true) {}
}

//Void - used for functions that don't return a value

function logMessage(message: string): void {
  console.log(message);
}

//Object

const user: object = {
  name: "Arthur",
  age: 25,
};

const user2: {
  name: string;
  age: number;
} = {
  name: "Arthur",
  age: 25,
};

//Array

const numbers1: number[] = [10, 20, 30];

const numbers2: Array<number> = [10, 20, 30, 40];

const names: string[] = ["Arthur", "Dutch", "Mica"];

//Tuple: has a fixed structure and order

const person: [string, number] = ["Arthur", 25];

//const person: [string, number] = [25, "Arthur"];

//Function 1

function add(a: number, b: number): number {
  return a + b;
}

//Function 2

function createGreeting(name: string): string {
  return `Hello, ${name}!`;
}

//Function 3

function isAdult(age: number): boolean {
  return age >= 18;
}

//Function 4

function printMessage(message: string): void {
  console.log(message);
}

//Function 5

function square(value: number): number {
  return value * value;
}

//Test return type inference

function multiply(a: number, b: number) {
  return a * b;
}

// : number not needed(typescript understands that the function returna a number)

function makeMessage(name: string) {
  return `Hello, ${name}!`;
}

//const vs let inference

const greeting = "Hello"; // TS infers the literal type "Hello"

// const greeting: "Hello" = "Hello" is valid
// const greeting: "Hello" = "Hi" is invalid

let message = "Hello"; // TS normally infers as string

// string | number with typeof

function processValue(value: string | number): string {
  if (typeof value === "string") {
    return `String value: ${value.toUpperCase()}`;
  }

  return `Number value: ${value * 2}`;
}

console.log(processValue("hello"));
console.log(processValue(10));
