import { describe, expect, it } from "vitest";
import { createStore } from "../src/state/store.js";
import { reducer } from "../src/state/reducer.js";
import type { State, Task } from "../src/state/types.js";

describe("Typed state manager", () => {
  it("dispatches typed actions and updates the state", () => {
    const initialState: State = {
      route: {
        path: "/home",
        params: {},
      },
      tasks: [],
      loading: false,
      error: null,
      settings: {
        theme: "light",
      },
    };

    const store = createStore(initialState, reducer);

    const task: Task = {
      id: "1",
      title: "Learn TypeScript",
      completed: false,
    };

    store.dispatch({
      type: "ADD_TASK",
      payload: task,
    });

    const state = store.getState();

    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0]).toEqual(task);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.settings.theme).toBe("light");
  });

  it("handles typed task actions", () => {
    const initialState: State = {
      route: {
        path: "/home",
        params: {},
      },
      tasks: [],
      loading: false,
      error: null,
      settings: {
        theme: "light",
      },
    };

    const store = createStore(initialState, reducer);

    store.dispatch({
      type: "ADD_TASK",
      payload: {
        id: "1",
        title: "Complete Task 6",
        completed: false,
      },
    });

    store.dispatch({
      type: "TOGGLE_TASK",
      payload: "1",
    });

    const state = store.getState();

    expect(state.tasks[0].completed).toBe(true);
  });
});
