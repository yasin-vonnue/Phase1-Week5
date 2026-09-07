export {};

interface Observer<T> {
  next(value: T): void;
}

type Unsubscribe = () => void;

interface Observable<T> {
  subscribe(observer: Observer<T>): Unsubscribe;
}

class Subject<T> implements Observable<T> {
  private observers: Observer<T>[] = [];

  public subscribe(observer: Observer<T>): Unsubscribe {
    this.observers.push(observer);

    return (): void => {
      const index = this.observers.indexOf(observer);

      if (index !== -1) {
        this.observers.splice(index, 1);
      }
    };
  }

  public next(value: T): void {
    this.observers.forEach((observer) => {
      observer.next(value);
    });
  }
}

// Command Pattern

interface Command {
  execute(): void;
  undo(): void;
}

class CommandHistory {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  public execute(command: Command): void {
    command.execute();

    this.undoStack.push(command);
    this.redoStack = [];
  }

  public undo(): void {
    const command = this.undoStack.pop();

    if (command === undefined) {
      return;
    }

    command.undo();
    this.redoStack.push(command);
  }

  public redo(): void {
    const command = this.redoStack.pop();

    if (command === undefined) {
      return;
    }

    command.execute();
    this.undoStack.push(command);
  }
}

// Example Command

class AddNumberCommand implements Command {
  public constructor(
    private numbers: number[],
    private value: number,
  ) {}

  public execute(): void {
    this.numbers.push(this.value);
  }

  public undo(): void {
    this.numbers.pop();
  }
}

// Observable demonstration

const subject = new Subject<string>();

const unsubscribe = subject.subscribe({
  next(value: string): void {
    console.log("Observer:", value);
  },
});

subject.next("Hello");

unsubscribe();

subject.next("World");

// CommandHistory test

const numbers: number[] = [];
const commandHistory = new CommandHistory();

const commands: Command[] = [
  new AddNumberCommand(numbers, 1),
  new AddNumberCommand(numbers, 2),
  new AddNumberCommand(numbers, 3),
  new AddNumberCommand(numbers, 4),
  new AddNumberCommand(numbers, 5),
];

// Execute five commands

commands.forEach((command: Command): void => {
  commandHistory.execute(command);
});

console.log("After five commands:", numbers);

// Undo five commands

for (let index = 0; index < 5; index += 1) {
  commandHistory.undo();
}

console.log("After five undos:", numbers);

// Typed test

if (numbers.length !== 0) {
  throw new Error("Test failed: commands were not reversed correctly");
}

console.log("Test passed: five commands were correctly reversed");

// Redo two commands

// Redo two commands

commandHistory.redo();
commandHistory.redo();

const redoLength: number = numbers.length;

console.log("After two redos:", numbers);

if (redoLength !== 2) {
  throw new Error("Test failed: redo did not restore commands correctly");
}

console.log("Redo test passed");
