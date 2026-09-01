type Listener = (...args: unknown[]) => void;

export class EventEmitter {
  private events = new Map<string, Set<Listener>>();

  on(event: string, listener: Listener): this {
    if (!this.events.has(event)) {
      this.events.set(event, new Set());
    }

    this.events.get(event)?.add(listener);

    return this;
  }

  off(event: string, listener: Listener): this {
    const listeners = this.events.get(event);

    if (!listeners) {
      return this;
    }

    listeners.delete(listener);

    if (listeners.size === 0) {
      this.events.delete(event);
    }

    return this;
  }

  emit(event: string, ...args: unknown[]): this {
    const listeners = this.events.get(event);

    if (listeners) {
      [...listeners].forEach((listener) => {
        listener(...args);
      });
    }

    const wildcardListeners = this.events.get("*");

    if (wildcardListeners) {
      [...wildcardListeners].forEach((listener) => {
        listener(event, ...args);
      });
    }

    return this;
  }

  once(event: string, listener: Listener): this {
    const wrapper: Listener = (...args: unknown[]): void => {
      this.off(event, wrapper);
      listener(...args);
    };

    this.on(event, wrapper);

    return this;
  }
}
