/**
 * Represents a task managed by the application.
 */
export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

/**
 * Represents the complete application state.
 *
 * Route parameters use Record<string, string> because the router
 * can provide different named parameters depending on the route.
 */
export type State = {
  route: {
    path: string;
    params: Record<string, string>;
  };
  tasks: Task[];
  loading: boolean;
  error: string | null;
  settings: {
    theme: string;
  };
};

/**
 * Represents every action that can modify the application state.
 *
 * The `type` property acts as a discriminant, allowing TypeScript
 * to narrow the payload to the correct type inside the reducer.
 */
export type Action =
  | {
      type: "ROUTE_CHANGED";
      payload: {
        path: string;
        params: Record<string, string>;
      };
    }
  | {
      type: "ADD_TASK";
      payload: Task;
    }
  | {
      type: "UPDATE_TASK";
      payload: Partial<Task> & { id: string };
    }
  | {
      type: "DELETE_TASK";
      payload: string;
    }
  | {
      type: "TOGGLE_TASK";
      payload: string;
    }
  | {
      type: "SET_LOADING";
      payload: boolean;
    }
  | {
      type: "SET_ERROR";
      payload: string | null;
    }
  | {
      type: "SET_THEME";
      payload: string;
    };

/**
 * Represents the function used to dispatch an action to the store.
 */
export type Dispatch = (action: Action) => void;

/**
 * Represents the reducer function that calculates the next state
 * from the current state and a dispatched action.
 */
export type Reducer = (state: State, action: Action) => State;

/**
 * Represents the public API exposed by the application store.
 *
 * The store provides access to the current state and allows
 * typed actions to be dispatched.
 */
export type Store = {
  getState: () => State;
  dispatch: Dispatch;
};
