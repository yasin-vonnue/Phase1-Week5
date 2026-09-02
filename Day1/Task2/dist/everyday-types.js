"use strict";
//string
const username = "Arthur";
// Number
const age = 25;
const price = 99.99;
//Boolean
const isLoggedIn = true;
//Null
const emptyValue = null;
//Undefined
const notAssigned = undefined;
//Symbol
const uniqueId = Symbol("id");
//BigInt
const largeNumber = 9007199254740991n;
//Any
let flexibleValue = "Hello";
flexibleValue = 123;
flexibleValue = true;
//Replacing Any with a better type
// let flexibleValue: string | number = "Hello";
// flexibleValue = 123;
// flexibleValue = true; this would produce an error
//Unknow is safer than any
let userInput = "Hello";
userInput = 42;
userInput = true;
// Never: represent something that never successfully produces a value
function throwError(message) {
    throw new Error(message);
}
function infiniteLoop() {
    while (true) { }
}
//Void - used for functions that don't return a value
function logMessage(message) {
    console.log(message);
}
//Object
const user = {
    name: "Arthur",
    age: 25,
};
const user2 = {
    name: "Arthur",
    age: 25,
};
//Array
const numbers1 = [10, 20, 30];
const numbers2 = [10, 20, 30, 40];
const names = ["Arthur", "Dutch", "Mica"];
//Tuple: has a fixed structure and order
const person = ["Arthur", 25];
//const person: [string, number] = [25, "Arthur"];
//Function 1
function add(a, b) {
    return a + b;
}
//Function 2
function createGreeting(name) {
    return `Hello, ${name}!`;
}
//Function 3
function isAdult(age) {
    return age >= 18;
}
//Function 4
function printMessage(message) {
    console.log(message);
}
//Function 5
function square(value) {
    return value * value;
}
//Test return type inference
function multiply(a, b) {
    return a * b;
}
// : number not needed(typescript understands that the function returna a number)
function makeMessage(name) {
    return `Hello, ${name}!`;
}
//const vs let inference
const greeting = "Hello"; // TS infers the literal type "Hello"
// const greeting: "Hello" = "Hello" is valid
// const greeting: "Hello" = "Hi" is invalid
let message = "Hello"; // TS normally infers as string
// string | number with typeof
function processValue(value) {
    if (typeof value === "string") {
        return `String value; ${value.toUpperCase()}`;
    }
    return `Number value: ${value * 2}`;
}
console.log(processValue("hello"));
console.log(processValue(10));
