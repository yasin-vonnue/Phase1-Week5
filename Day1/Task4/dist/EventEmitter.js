export class EventEmitter {
    events = new Map();
    on(event, listener) {
        if (!this.events.has(event)) {
            this.events.set(event, new Set());
        }
        this.events.get(event)?.add(listener);
        return this;
    }
    off(event, listener) {
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
    emit(event, ...args) {
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
    once(event, listener) {
        const wrapper = (...args) => {
            this.off(event, wrapper);
            listener(...args);
        };
        this.on(event, wrapper);
        return this;
    }
}
