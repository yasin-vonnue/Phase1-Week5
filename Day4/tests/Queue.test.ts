import { describe, expect, it } from "vitest";
import { Queue } from "../src/utils/Queue.js";

describe("Queue<T>", () => {
  it("stores and retrieves strings", () => {
    const queue = new Queue<string>();

    queue.enqueue("first");
    queue.enqueue("second");

    expect(queue.dequeue()).toBe("first");
    expect(queue.dequeue()).toBe("second");
  });

  it("stores and retrieves numbers", () => {
    const queue = new Queue<number>();

    queue.enqueue(10);
    queue.enqueue(20);

    expect(queue.dequeue()).toBe(10);
    expect(queue.dequeue()).toBe(20);
  });

  it("stores and retrieves objects", () => {
    type User = { id: number; name: string };
    const queue = new Queue<User>();
    queue.enqueue({ id: 1, name: "Yasin" });
    const user = queue.dequeue();
    expect(user).toEqual({ id: 1, name: "Yasin" });
  });
  it("tracks the queue size", () => {
    const queue = new Queue<string>();
    queue.enqueue("one");
    queue.enqueue("two");
    expect(queue.size).toBe(2);
    queue.dequeue();
    expect(queue.size).toBe(1);
  });
});
