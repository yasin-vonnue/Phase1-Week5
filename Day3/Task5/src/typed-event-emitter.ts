interface User {
  id: string;
  name: string;
  email: string;
}

type UserEvents = {
  userAdded: [User];
  userRemoved: [string];
  userUpdated: [string, Partial<User>];
};

class TypedEventEmitter<Events extends Record<string, unknown[]>> {
  private listeners: {
    [K in keyof Events]?: Array<(...args: Events[K]) => void>;
  } = {};

  on<K extends keyof Events>(
    event: K,
    listener: (...args: Events[K]) => void,
  ): this {
    const eventListeners = this.listeners[event] ?? [];

    eventListeners.push(listener);

    this.listeners[event] = eventListeners;

    return this;
  }

  emit<K extends keyof Events>(event: K, ...args: Events[K]): boolean {
    const eventListeners = this.listeners[event];

    if (!eventListeners) {
      return false;
    }

    eventListeners.forEach((listener) => {
      listener(...args);
    });

    return true;
  }
}

// Create emitter

const emitter = new TypedEventEmitter<UserEvents>();

//userAdded

emitter.on("userAdded", (user) => {
  console.log("User added:", user.name);
});

//userRemoved

emitter.on("userRemoved", (userId) => {
  console.log("User removed:", userId);
});

//userUpdated

emitter.on("userUpdated", (userId, changes) => {
  console.log("User updated:", userId, changes);
});

//Emit events

const user: User = {
  id: "1",
  name: "Arthur",
  email: "arthur@example.com",
};

emitter.emit("userAdded", user);

emitter.emit("userRemoved", "1");

emitter.emit("userUpdated", "1", {
  name: "Dutch",
});

// TypeScript catches these errors:

// emitter.emit("userAdded", "1");
// Error: Argument of type 'string' is not assignable to parameter of type 'User'.

// emitter.emit("userRemoved", 123);
// Error: Argument of type 'number' is not assignable to parameter of type 'string'.

// emitter.emit("userUpdated", "1");
// Error: Expected 3 arguments, but got 2.

// emitter.emit("unknownEvent", "1");
// Error: Argument of type '"unknownEvent"' is not assignable to parameter of type 'keyof UserEvents'.
