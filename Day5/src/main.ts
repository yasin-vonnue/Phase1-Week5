import { createStore } from "./state/store.js";
import { initialState } from "./state/initialState.js";
import { reducer } from "./state/reducer.js";
import { storageMiddleware, loadState } from "./state/storageMiddleware.js";
import { loadTasks } from "./state/taskActions.js";

import { register, navigate, initRouter } from "./router.js";

import { renderHomePage } from "./pages/Home.js";
import { renderListPage } from "./pages/List.js";
import { renderDetailPage } from "./pages/Detail.js";
import { renderSettingsPage } from "./pages/Settings.js";

const savedState = loadState();

const store = createStore(
  {
    ...initialState,
    ...savedState,
    loading: false,
    error: null,
  },
  reducer,
  storageMiddleware,
);

const app = document.querySelector<HTMLElement>("#app");

if (!app) {
  throw new Error("App root element not found");
}

register("/home", renderHomePage);
register("/list", renderListPage);
register("/detail/:id", renderDetailPage);
register("/settings", renderSettingsPage);

initRouter({
  root: app,
  stateStore: store,
});

document.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const link = event.target.closest("[data-link]");

  if (!link) {
    return;
  }

  event.preventDefault();

  const path = link.getAttribute("href");

  if (!path) {
    return;
  }

  navigate(path);
});

loadTasks(store.dispatch);
