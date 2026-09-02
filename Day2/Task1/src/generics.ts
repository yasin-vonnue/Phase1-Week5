// 1. Generic identity function

function identity<T>(arg: T): T {
  return arg;
}

const name1 = identity("Arthur");
const age = identity(25);

type User = {
  id: number;
  name: string;
};

const user = identity<User>({
  id: 1,
  name: "Arthur",
});

console.log(name1);
console.log(age);
console.log(user);

// 2. Generic first function

function first<T>(arr: T[]): T | undefined {
  return arr[0];
}

console.log(first([10, 20, 30]));
console.log(first(["Arthur", "Dutch"]));
console.log(first([]));

// 3. Generic fetchData function

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return response.json() as Promise<T>;
}

type Post = {
  id: number;
  title: string;
};

async function loadPost(): Promise<void> {
  const post = await fetchData<Post>(
    "https://jsonplaceholder.typicode.com/posts/1",
  );

  console.log(post.title);
}

loadPost();

// 4. Generic getProperty function

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = {
  name: "Arthur",
  age: 35,
};

const personName = getProperty(person, "name");
const personAge = getProperty(person, "age");

console.log(personName);
console.log(personAge);

// 5. Generic Queue class

class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items[0];
  }

  peek(): T | undefined {
    return this.items[0];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const numberQueue = new Queue<number>();

numberQueue.enqueue(10);
numberQueue.enqueue(20);

console.log(numberQueue.peek());
console.log(numberQueue.dequeue());
console.log(numberQueue.isEmpty());

const stringQueue = new Queue<string>();

stringQueue.enqueue("Arthur");
stringQueue.enqueue("Dutch");

console.log(stringQueue.peek());
console.log(stringQueue.dequeue());
