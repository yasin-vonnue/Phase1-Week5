import { describe, expect, it } from "vitest";
import { reducer } from "../src/state/reducer";
import type { State } from "../src/state/types";

const initialState: State = {
  route: {
    path: "/home",
    params: {},
  },
  tasks: [
    {
      id: "1",
      title: "Learn TypeScript",
      description: "Practice TypeScript",
      completed: false,
    },
  ],
  loading: false,
  error: null,
  settings: {
    theme: "light",
  },
};

describe("reducer", () => {
  it("handles ROUTE_CHANGED", () => {
    const state = reducer(initialState, {
      type: "ROUTE_CHANGED",
      payload: {
        path: "/list",
        params: {},
      },
    });

    expect(state.route).toEqual({
      path: "/list",
      params: {},
    });
  });

  it("handles ADD_TASK", () => {
    const newTask = {
      id: "2",
      title: "Write tests",
      completed: false,
    };

    const state = reducer(initialState, {
      type: "ADD_TASK",
      payload: newTask,
    });

    expect(state.tasks).toHaveLength(2);
    expect(state.tasks[1]).toEqual(newTask);
  });

  it("handles UPDATE_TASK", () => {
    const state = reducer(initialState, {
      type: "UPDATE_TASK",
      payload: {
        id: "1",
        title: "Updated title",
        completed: true,
      },
    });

    expect(state.tasks[0]).toEqual({
      id: "1",
      title: "Updated title",
      description: "Practice TypeScript",
      completed: true,
    });
  });

  it("handles UPDATE_TASK when task does not exist", () => {
    const state = reducer(initialState, {
      type: "UPDATE_TASK",
      payload: {
        id: "999",
        title: "New title",
      },
    });

    expect(state.tasks).toEqual(initialState.tasks);
  });

  it("handles DELETE_TASK", () => {
    const state = reducer(initialState, {
      type: "DELETE_TASK",
      payload: "1",
    });

    expect(state.tasks).toHaveLength(0);
  });

  it("handles DELETE_TASK when task does not exist", () => {
    const state = reducer(initialState, {
      type: "DELETE_TASK",
      payload: "999",
    });

    expect(state.tasks).toEqual(initialState.tasks);
  });

  it("handles TOGGLE_TASK", () => {
    const state = reducer(initialState, {
      type: "TOGGLE_TASK",
      payload: "1",
    });

    expect(state.tasks[0].completed).toBe(true);
  });

  it("handles TOGGLE_TASK when task does not exist", () => {
    const state = reducer(initialState, {
      type: "TOGGLE_TASK",
      payload: "999",
    });

    expect(state.tasks).toEqual(initialState.tasks);
  });

  it("handles SET_LOADING", () => {
    const state = reducer(initialState, {
      type: "SET_LOADING",
      payload: true,
    });

    expect(state.loading).toBe(true);
  });

  it("handles SET_ERROR", () => {
    const state = reducer(initialState, {
      type: "SET_ERROR",
      payload: "Failed to load tasks",
    });

    expect(state.error).toBe("Failed to load tasks");
  });

  it("handles SET_THEME", () => {
    const state = reducer(initialState, {
      type: "SET_THEME",
      payload: "dark",
    });

    expect(state.settings.theme).toBe("dark");
  });

  it("returns the same state for an unknown action", () => {
    const unknownAction = {
      type: "UNKNOWN_ACTION",
      payload: null,
    } as never;

    const state = reducer(initialState, unknownAction);

    expect(state).toBe(initialState);
  });
});
