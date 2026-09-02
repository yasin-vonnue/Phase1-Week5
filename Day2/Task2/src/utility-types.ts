// User type
interface User {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  createdAt: string;
  avatar?: string;
}

// 1. Partial<User>
async function updateUser(id: string, changes: Partial<User>): Promise<User> {
  const currentUser: User = {
    id,
    name: "Arthur",
    email: "arthur@example.com",
    role: "user",
    createdAt: "2026-09-02",
  };

  return {
    ...currentUser,
    ...changes,
  };
}

updateUser("1", { name: "Dutch" }).then(console.log);

// 2. Required<User>
function createRequiredUser(data: Required<User>): User {
  return data;
}

const completeUser = createRequiredUser({
  id: "2",
  name: "John",
  email: "john@example.com",
  role: "admin",
  createdAt: "2026-09-02",
  avatar: "john.jpg",
});

console.log(completeUser);

// 3. Pick<User>
type UserPreview = Pick<User, "id" | "name" | "avatar">;

const preview: UserPreview = {
  id: "3",
  name: "Micah",
  avatar: "micah.jpg",
};

console.log(preview);

// 4. Omit<User>
type UserInput = Omit<User, "id" | "createdAt">;

const newUser: UserInput = {
  name: "Sadie",
  email: "sadie@example.com",
  role: "user",
  avatar: "sadie.jpg",
};

console.log(newUser);

// 5. Record
type ConfigKey = "apiUrl" | "timeout" | "environment";

const config: Record<ConfigKey, string> = {
  apiUrl: "https://api.example.com",
  timeout: "5000",
  environment: "development",
};

console.log(config);
