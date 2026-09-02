// 1. noImplicitAny

function greet(name: string): string {
  return `Hello, ${name}`;
}

console.log(greet("Arthur"));

// noImplicitAny prevents parameters from implicitly becoming `any`.
//
// Example that would produce an error:
//
// function greet(name) {
//   return `Hello, ${name}`;
// }


// 2. strictNullChecks

function findUser(id: number): string | undefined {
  const users: Record<number, string> = {
    1: "Arthur",
    2: "Dutch",
  };

  return users[id];
}

const user = findUser(3);

// This would produce an error because `user` may be undefined:
//
// console.log(user.toUpperCase());

if (user !== undefined) {
  console.log(user.toUpperCase());
}


// 3. strictFunctionTypes

type Handler = (value: string) => void;

const handler: Handler = (value: string): void => {
  console.log(value);
};

handler("Hello");

// An incompatible function parameter would produce an error:
//
// const invalidHandler: Handler = (value: number): void => {
//   console.log(value);
// };


// 4. noUncheckedIndexedAccess

const numbers: number[] = [10, 20, 30];

const firstNumber = numbers[0];

// With noUncheckedIndexedAccess enabled,
// firstNumber is `number | undefined`.

if (firstNumber !== undefined) {
  console.log(firstNumber * 2);
}

// Without the check above, this would produce an error:
//
// console.log(firstNumber * 2);