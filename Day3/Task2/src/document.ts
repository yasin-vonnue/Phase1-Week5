interface Serializable {
  toJSON(): string;
  fromJSON(data: string): this;
}

interface Printable {
  print(): void;
  getDisplayName(): string;
}

interface ValidationResult {
  valid: boolean;
  message?: string;
}

interface Validatable {
  validate(): ValidationResult;
}

class MyDocument implements Serializable, Printable, Validatable {
  constructor(
    public title: string,
    public content: string,
  ) {}

  toJSON(): string {
    return JSON.stringify({
      title: this.title,
      content: this.content,
    });
  }

  fromJSON(data: string): this {
    const parsed = JSON.parse(data) as {
      title: string;
      content: string;
    };

    this.title = parsed.title;
    this.content = parsed.content;

    return this;
  }

  print(): void {
    console.log(this.content);
  }

  getDisplayName(): string {
    return this.title;
  }

  validate(): ValidationResult {
    if (!this.title.trim()) {
      return {
        valid: false,
        message: "Title is required",
      };
    }

    if (!this.content.trim()) {
      return {
        valid: false,
        message: "Content is required",
      };
    }

    return {
      valid: true,
    };
  }
}

// Test Document
const myDocument = new MyDocument("My Document", "Hello TypeScript");

console.log(myDocument.getDisplayName());

myDocument.print();

console.log(myDocument.validate());

const json = myDocument.toJSON();

console.log(json);

myDocument.fromJSON('{"title":"Updated Document","content":"Updated content"}');

console.log(myDocument.getDisplayName());

myDocument.print();

// Structural typing
// This object satisfies Serializable without implementing it explicitly.
const plainObject: Serializable = {
  toJSON(): string {
    return JSON.stringify({
      name: "Arthur",
    });
  },

  fromJSON(data: string) {
    console.log(data);
    return this;
  },
};

console.log(plainObject.toJSON());
