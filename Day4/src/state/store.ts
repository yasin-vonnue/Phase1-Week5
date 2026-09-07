import type { Action, Dispatch, Reducer, State } from "./types.js";

type Middleware = (store: {
  getState: () => State;
}) => (next: (action: Action) => void) => (action: Action) => void;

export function createStore(
  initialState: State,
  reducer: Reducer,
  middleware?: Middleware,
) {
  let state = initialState;
  const listeners: Set<() => void> = new Set();

  function getState() {
    return state;
  }

  function baseDispatch(action: Action): Action {
    state = reducer(state, action);

    listeners.forEach((listener) => {
      listener();
    });

    return action;
  }

  let dispatch: (action: Action) => void = baseDispatch;

  if (middleware) {
    dispatch = middleware({
      getState,
    })(baseDispatch);
  }

  function subscribe(listener: () => void): () => void {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}
