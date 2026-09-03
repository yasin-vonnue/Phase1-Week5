// Card type
interface Card {
  id: number;
  title: string;
  column: string;
}

// Kanban state
interface KanbanState {
  cards: Card[];
}

// 1. Discriminated union actions
type KanbanAction =
  | {
      type: "ADD_CARD";
      card: Card;
    }
  | {
      type: "REMOVE_CARD";
      id: number;
    }
  | {
      type: "MOVE_CARD";
      id: number;
      column: string;
    };

// 2. Type-safe reducer
function kanbanReducer(state: KanbanState, action: KanbanAction): KanbanState {
  switch (action.type) {
    case "ADD_CARD":
      return {
        ...state,
        cards: [...state.cards, action.card],
      };

    case "REMOVE_CARD":
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.id),
      };

    case "MOVE_CARD":
      return {
        ...state,
        cards: state.cards.map((card) =>
          card.id === action.id ? { ...card, column: action.column } : card,
        ),
      };
  }
}

// 3. Generic createStore<S, A>
function createStore<S, A extends { type: string }>(
  initialState: S,
  reducer: (state: S, action: A) => S,
) {
  let state = initialState;

  const listeners: Array<(state: S) => void> = [];

  function getState(): S {
    return state;
  }

  // 4. dispatch only accepts A
  function dispatch(action: A): void {
    state = reducer(state, action);

    listeners.forEach((listener) => {
      listener(state);
    });
  }

  // 5. subscribe returns unsubscribe function
  function subscribe(listener: (state: S) => void): () => void {
    listeners.push(listener);

    return () => {
      const index = listeners.indexOf(listener);

      if (index !== -1) {
        listeners.splice(index, 1);
      }
    };
  }

  return {
    getState,
    dispatch,
    subscribe,
  };
}

// Create the store
const store = createStore<KanbanState, KanbanAction>(
  {
    cards: [],
  },
  kanbanReducer,
);

// Test ADD_CARD
store.dispatch({
  type: "ADD_CARD",
  card: {
    id: 1,
    title: "Learn TypeScript",
    column: "todo",
  },
});

// Test MOVE_CARD
store.dispatch({
  type: "MOVE_CARD",
  id: 1,
  column: "done",
});

// Test REMOVE_CARD
store.dispatch({
  type: "REMOVE_CARD",
  id: 1,
});

// Test subscribe
const unsubscribe = store.subscribe((state) => {
  console.log("State changed:", state);
});

store.dispatch({
  type: "ADD_CARD",
  card: {
    id: 2,
    title: "Build State Manager",
    column: "todo",
  },
});

console.log("Current state:", store.getState());

unsubscribe();
