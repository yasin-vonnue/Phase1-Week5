abstract class Shape {
  abstract area(): number;

  abstract perimeter(): number;

  describe(): string {
    return `Area: ${this.area()}, Perimeter: ${this.perimeter()}`;
  }

  static create(
    type: "circle" | "rect" | "triangle",
    ...args: number[]
  ): Shape {
    switch (type) {
      case "circle":
        return new Circle(args[0]);

      case "rect":
        return new Rectangle(args[0], args[1]);

      case "triangle":
        return new Triangle(args[0], args[1], args[2]);

      default:
        throw new Error(`Unknown shape type: ${type}`);
    }
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }

  area(): number {
    return Math.PI * this.radius ** 2;
  }

  perimeter(): number {
    return 2 * Math.PI * this.radius;
  }
}

class Rectangle extends Shape {
  constructor(
    private width: number,
    private height: number,
  ) {
    super();
  }

  area(): number {
    return this.width * this.height;
  }

  perimeter(): number {
    return 2 * (this.width + this.height);
  }
}

class Triangle extends Shape {
  constructor(
    private sideA: number,
    private sideB: number,
    private sideC: number,
  ) {
    super();
  }

  area(): number {
    const semiPerimeter = this.perimeter() / 2;

    return Math.sqrt(
      semiPerimeter *
        (semiPerimeter - this.sideA) *
        (semiPerimeter - this.sideB) *
        (semiPerimeter - this.sideC),
    );
  }

  perimeter(): number {
    return this.sideA + this.sideB + this.sideC;
  }
}

// Abstract classes cannot be instantiated.
// TypeScript will produce a compile-time error:
//
// const shape = new Shape();

// Create shapes directly
const circle = new Circle(5);
const rectangle = new Rectangle(10, 5);
const triangle = new Triangle(3, 4, 5);

console.log("Circle");
console.log("Area:", circle.area());
console.log("Perimeter:", circle.perimeter());
console.log(circle.describe());

console.log("\nRectangle");
console.log("Area:", rectangle.area());
console.log("Perimeter:", rectangle.perimeter());
console.log(rectangle.describe());

console.log("\nTriangle");
console.log("Area:", triangle.area());
console.log("Perimeter:", triangle.perimeter());
console.log(triangle.describe());

// Static factory
const factoryCircle = Shape.create("circle", 5);
const factoryRectangle = Shape.create("rect", 10, 5);
const factoryTriangle = Shape.create("triangle", 3, 4, 5);

console.log("\nFactory Circle");
console.log(factoryCircle.describe());

console.log("\nFactory Rectangle");
console.log(factoryRectangle.describe());

console.log("\nFactory Triangle");
console.log(factoryTriangle.describe());
