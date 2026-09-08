import type { Dispatch } from "./types";

export async function loadTasks(dispatch: Dispatch) {
  dispatch({
    type: "SET_LOADING",
    payload: true,
  });

  dispatch({
    type: "SET_ERROR",
    payload: null,
  });

  try {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    dispatch({
      type: "SET_LOADING",
      payload: false,
    });

    dispatch({
      type: "SET_ERROR",
      payload: message,
    });
  }
}

export async function loadTasksWithError(dispatch: Dispatch) {
  dispatch({
    type: "SET_LOADING",
    payload: true,
  });

  dispatch({
    type: "SET_ERROR",
    payload: null,
  });

  try {
    await new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Failed to load tasks"));
      }, 1000);
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);

    dispatch({
      type: "SET_LOADING",
      payload: false,
    });

    dispatch({
      type: "SET_ERROR",
      payload: message,
    });
  }
}
