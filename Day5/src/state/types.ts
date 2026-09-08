export type Task = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
};

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

export type Dispatch = (action: Action) => void;

export type Reducer = (state: State, action: Action) => State;

export type Store = {
  getState: () => State;
  dispatch: Dispatch;
};
