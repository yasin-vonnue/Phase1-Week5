export {};

//Class decorator

function sealed<T extends new (...args: never[]) => object>(
  constructor: T,
): void {
  Object.seal(constructor);
  Object.seal(constructor.prototype);
}

// Method decorator

function log(
  target: object,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): void {
  const originalMethod = descriptor.value as (...args: unknown[]) => unknown;

  descriptor.value = function (...args: unknown[]): unknown {
    console.log(`Calling: ${propertyKey}`);
    console.log("Arguments:", args);

    const result = originalMethod.apply(this, args);

    console.log("Returned:", result);

    return result;
  };
}

@sealed
class User {
  public constructor(
    public name: string,
    public age: number,
  ) {}

  @log
  public greet(message: string): string {
    return `${message}, ${this.name}`;
  }

  @log
  public getAgeAfter(years: number): number {
    return this.age + years;
  }
}

// Test

const user = new User("Arthur", 35);

console.log(user.greet("Hello"));

console.log(user.getAgeAfter(5));

// Verify sealing

console.log("Constructor sealed:", Object.isSealed(User));

console.log("Prototype sealed:", Object.isSealed(User.prototype));

// This will fail silently or throw in strict mode
// (because the class is sealed)

// (user as { city?: string }).city = "London";
