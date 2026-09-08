import { describe, expect, test, vi } from "vitest";

import { createStore } from "../src/state/store.js";
import type { Action, State } from "../src/state/types.js";

describe("createStore", () => {
  const createInitialState = (): State => ({
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
  });

  test("returns the initial state", () => {
    const initialState = createInitialState();

    const store = createStore(initialState, (state) => state);

    expect(store.getState()).toEqual(initialState);
  });

  test("dispatch updates the state", () => {
    const initialState = createInitialState();

    const reducer = (state: State, action: Action): State => {
      if (action.type === "SET_LOADING") {
        return {
          ...state,
          loading: action.payload,
        };
      }

      return state;
    };

    const store = createStore(initialState, reducer);

    store.dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    expect(store.getState().loading).toBe(true);
  });

  test("subscriber is notified after dispatch", () => {
    const initialState = createInitialState();

    const reducer = (state: State, action: Action): State => {
      if (action.type === "SET_LOADING") {
        return {
          ...state,
          loading: action.payload,
        };
      }

      return state;
    };

    const store = createStore(initialState, reducer);

    const listener = vi.fn();

    store.subscribe(listener);

    store.dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    expect(listener).toHaveBeenCalledTimes(1);
  });

  test("unsubscribe stops notifications", () => {
    const initialState = createInitialState();

    const reducer = (state: State, action: Action): State => {
      if (action.type === "SET_LOADING") {
        return {
          ...state,
          loading: action.payload,
        };
      }

      return state;
    };

    const store = createStore(initialState, reducer);

    const listener = vi.fn();

    const unsubscribe = store.subscribe(listener);

    unsubscribe();

    store.dispatch({
      type: "SET_LOADING",
      payload: true,
    });

    expect(listener).not.toHaveBeenCalled();
  });
});
