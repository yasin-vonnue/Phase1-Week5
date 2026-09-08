/**
 * A generic first-in, first-out (FIFO) queue.
 *
 * @typeParam T - The type of items stored in the queue.
 */
export class Queue<T> {
  private items: T[] = [];

  enqueue(item: T): void {
    this.items.push(item);
  }

  dequeue(): T | undefined {
    return this.items.shift();
  }

  get size(): number {
    return this.items.length;
  }
}
