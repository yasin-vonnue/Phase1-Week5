interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "viewer" | "editor";
  createdAt: Date;
  avatar?: string;
}

const user1: User = {
  id: 1,
  name: "Arthur",
  email: "arthur@example.com",
  role: "admin",
  createdAt: new Date("2026-08-01"),
  avatar: "arthur.jpg",
};

const user2: User = {
  id: 2,
  name: "Dutch",
  email: "dutch@example.com",
  role: "editor",
  createdAt: new Date("2026-08-02"),
};

const user3: User = {
  id: 3,
  name: "John",
  email: "john@example.com",
  role: "viewer",
  createdAt: new Date("2026-08-03"),
  avatar: "john.jpg",
};

const user4: User = {
  id: 4,
  name: "Sadie",
  email: "sadie@example.com",
  role: "editor",
  createdAt: new Date("2026-08-04"),
};

const user5: User = {
  id: 5,
  name: "Mica",
  email: "mica@example.com",
  role: "viewer",
  createdAt: new Date("2026-08-05"),
  avatar: "mica.jpg",
};

//Demonstrating excess property checking

// const invalidUser: User = {
//     id: 6,
//     name: "Charles",
//     email: "charles@example.com",
//     role: "viewer",
//     createdAt: new Date(),
//     avatar: "charles.jpg",
//     age: 30,  Object literal may only specify known properties, and 'age' does not exist in type 'User'.
// }

// Readonly<User> creates a version of User where its properties cannot be changed.

type ReadonlyUser = Readonly<User>;

const readonlyUser: ReadonlyUser = user1;

console.log(readonlyUser.name); //allowed

// readonlyUser.name = "John"; not allowed (Cannot assign to 'name' because it is a read-only property error will be shown)

// Parital<User> and updateUser

//Partial<User> makes all User properties optional.

function updateUser(user: User, changes: Partial<User>): User {
  return {
    ...user,
    ...changes,
  };
}

const updatedUser = updateUser(user1, {
  name: "Arthur Morgan",
  role: "editor",
});

console.log(updatedUser);
console.log(user1);

//Interface vs Type Alias

//Interface
//An interface can be extended using extends

interface AdminUser extends User {
  permissions: string[];
}

const admin: AdminUser = {
  id: 10,
  name: "Jack",
  email: "jack@example.com",
  role: "admin",
  createdAt: new Date(),
  permissions: ["read", "write", "delete"],
};

//Type alias

//A type alias can represent essentially the same object structure

type UserType = {
  id: number;
  name: string;
};

//can be extended using an intersection type

type EditorUser = UserType & {
  permissions: string[];
};

const editor: EditorUser = {
  id: 11,
  name: "Sparrow",
  permissions: ["read", "write"],
};

console.log(admin);
console.log(editor);

//for normal object structures, interfaces & type alias are often interchangeable
// Main difference is that interfaces can be re-opened/merged.

interface Product {
  id: number;
}

interface Product {
  price: number;
}

// TS combines them, so Product becomes:

// interface Product {
//     id: number;
//     price: number;
// }

//A type alias cannot be declared twice with the same name(That would produce a duplicate identifier error)

//Interfaces are commonly used for object shapes and are extendable with extends; type aliases are more flexible
// and can represent unions, intersections, primitives, tuples, and other types.
