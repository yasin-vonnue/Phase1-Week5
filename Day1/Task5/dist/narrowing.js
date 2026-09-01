"use strict";
function processInput(value) {
    if (typeof value === "string") {
        return `String: ${value.toUpperCase()}`;
    }
    if (typeof value === "number") {
        return `Number: ${value * 2}`;
    }
    if (typeof value === "boolean") {
        return `Boolean: ${value ? "true" : "false"}`;
    }
    if (value === null) {
        return "Value is null";
    }
    return "Value is undefined";
}
console.log(processInput("hello"));
console.log(processInput(10));
console.log(processInput(true));
console.log(processInput(null));
console.log(processInput(undefined));
function isUser(value) {
    //value is User is a type predicate: If this function
    // returns true, treat the value as a User
    if (typeof value !== "object" || value === null) {
        return false;
    }
    if (!("id" in value) || !("name" in value)) {
        return false;
    }
    if (!("email" in value) || !("role" in value)) {
        return false;
    }
    if (!("createdAt" in value)) {
        return false;
    }
    if ("avatar" in value && value.avatar !== undefined) {
        if (typeof value.avatar !== "string") {
            return false;
        }
    }
    return (typeof value.id === "number" &&
        typeof value.name === "string" &&
        typeof value.email === "string" &&
        (value.role === "admin" ||
            value.role === "viewer" ||
            value.role === "editor") &&
        value.createdAt instanceof Date &&
        (!("avatar" in value) ||
            value.avatar === undefined ||
            typeof value.avatar === "string"));
}
const apiResponse = {
    id: 1,
    name: "Arthur",
    email: "arthur@example.com",
    role: "admin",
    createdAt: new Date(),
};
if (isUser(apiResponse)) {
    console.log("Valid user:", apiResponse.name);
}
function assertNever(value) {
    throw new Error(`Unexpected shape: ${JSON.stringify(value)}`);
}
function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rect":
            return shape.w * shape.h;
        case "triangle":
            return (shape.base * shape.height) / 2;
        default:
            return assertNever(shape);
    }
}
const circle = {
    kind: "circle",
    radius: 5,
};
const rectangle = {
    kind: "rect",
    w: 10,
    h: 5,
};
const triangle = {
    kind: "triangle",
    base: 10,
    height: 5,
};
console.log("Circle area:", getArea(circle));
console.log("Rectangle area:", getArea(rectangle));
console.log("Triangle area:", getArea(triangle));
