"use strict";
const user1 = {
    id: 1,
    name: "Arthur",
    email: "arthur@example.com",
    role: "admin",
    createdAt: new Date("2026-08-01"),
    avatar: "arthur.jpg",
};
const user2 = {
    id: 2,
    name: "Dutch",
    email: "dutch@example.com",
    role: "editor",
    createdAt: new Date("2026-08-02"),
};
const user3 = {
    id: 3,
    name: "John",
    email: "john@example.com",
    role: "viewer",
    createdAt: new Date("2026-08-03"),
    avatar: "john.jpg",
};
const user4 = {
    id: 4,
    name: "Sadie",
    email: "sadie@example.com",
    role: "editor",
    createdAt: new Date("2026-08-04"),
};
const user5 = {
    id: 5,
    name: "Mica",
    email: "mica@example.com",
    role: "viewer",
    createdAt: new Date("2026-08-05"),
    avatar: "mica.jpg",
};
const readonlyUser = user1;
console.log(readonlyUser.name); //allowed
// readonlyUser.name = "John"; not allowed (Cannot assign to 'name' because it is a read-only property error will be shown)
// Parital<User> and updateUser
//Partial<User> makes all User properties optional.
function updateUser(user, changes) {
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
const admin = {
    id: 10,
    name: "Jack",
    email: "jack@example.com",
    role: "admin",
    createdAt: new Date(),
    permissions: ["read", "write", "delete"],
};
const editor = {
    id: 11,
    name: "Sparrow",
    permissions: ["read", "write"],
};
console.log(admin);
console.log(editor);
// TS combines them, so Product becomes:
// interface Product {
//     id: number;
//     price: number;
// }
//A type alias cannot be declared twice with the same name(That would produce a duplicate identifier error)
//Interfaces are commonly used for object shapes and are extendable with extends; type aliases are more flexible
// and can represent unions, intersections, primitives, tuples, and other types.
