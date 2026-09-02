// 1. MyReadonly<T>

type MyReadonly<T> = {
  readonly [K in keyof T]: T[K];
};

interface User {
  id: number;
  name: string;
  email: string;
}

const readonlyUser: MyReadonly<User> = {
  id: 1,
  name: "Arthur",
  email: "arthur@example.com",
};

console.log(readonlyUser);

//This would cause a TypeScript error:
// readonlyUser.name = "Dutch";

//2. MyPartial<T>

type MyPartial<T> = {
  [K in keyof T]?: T[K];
};

const partialUser: MyPartial<User> = {
  name: "Dutch",
};

console.log(partialUser);

// 3. DeepPartial<T>

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

interface Profile {
  name: string;
  address: {
    city: string;
    country: string;
  };
}

const partialProfile: DeepPartial<Profile> = {
  address: {
    city: "BlackWater",
  },
};

console.log(partialProfile);

// 4. keyof + typeof

const settings = {
  theme: "dark",
  language: "en",
  notifications: true,
};

type SettingsKey = keyof typeof settings;

function getSetting(
  object: typeof settings,
  key: SettingsKey,
): (typeof settings)[SettingsKey] {
  return object[key];
}

console.log(getSetting(settings, "theme"));
console.log(getSetting(settings, "language"));
console.log(getSetting(settings, "notifications"));

// This would cause a TypeScript error:
// getSetting(settings, "invalid");
