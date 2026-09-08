import type { Store } from "./state/types";

type RouteParams = Record<string, string>;

type Component = (params: RouteParams, store: Store) => HTMLElement;

type Route = {
  path: string;
  component: Component;
};

type RouteMatch = {
  component: Component;
  params: RouteParams;
};

type RouterOptions = {
  root: HTMLElement;
  stateStore: Store;
};

const routes: Route[] = [];
let store: Store | null = null;
let outlet: HTMLElement | null = null;

export function register(path: string, component: Component): void {
  routes.push({
    path,
    component,
  });
}

export function matchRoute(path: string): RouteMatch | null {
  const cleanPath = path.replace(/^#/, "");
  const pathname = cleanPath.split("?")[0];

  const pathSegments = pathname.split("/").filter(Boolean);

  for (const route of routes) {
    const routeSegments = route.path.split("/").filter(Boolean);

    if (routeSegments.length !== pathSegments.length) {
      continue;
    }

    const params: RouteParams = {};
    let matched = true;

    for (let index = 0; index < routeSegments.length; index += 1) {
      const routeSegment = routeSegments[index];
      const pathSegment = pathSegments[index];

      if (routeSegment.startsWith(":")) {
        const paramName = routeSegment.slice(1);

        params[paramName] = decodeURIComponent(pathSegment);
      } else if (routeSegment !== pathSegment) {
        matched = false;
        break;
      }
    }

    if (matched) {
      return {
        component: route.component,
        params,
      };
    }
  }

  return null;
}

function renderRoute(match: RouteMatch): void {
  if (!outlet) {
    return;
  }

  outlet.innerHTML = "";

  if (!store) {
    return;
  }

  const element = match.component(match.params, store);

  if (element) {
    outlet.append(element);
  }
}

type NavigateOptinos = {
  replace?: boolean;
};

export function navigate(path: string, options: NavigateOptinos = {}): void {
  const { replace = false } = options;

  const match = matchRoute(path);

  if (!match) {
    console.error(`No route found for "${path}"`);
    return;
  }

  if (replace) {
    window.location.replace(`#${path}`);
  } else {
    window.location.hash = path;
  }

  if (!store) {
    return;
  }

  store.dispatch({
    type: "ROUTE_CHANGED",
    payload: {
      path,
      params: match.params,
    },
  });

  renderRoute(match);
}

function handleHashChange() {
  const path = window.location.hash.slice(1) || "/home";

  const match = matchRoute(path);

  if (!match) {
    console.error(`No route found for "${path}"`);
    return;
  }

  if (!store) {
    return;
  }

  store.dispatch({
    type: "ROUTE_CHANGED",
    payload: {
      path,
      params: match.params,
    },
  });

  renderRoute(match);
}

export function initRouter({ root, stateStore }: RouterOptions): void {
  outlet = root;
  store = stateStore;

  window.addEventListener("hashchange", handleHashChange);

  const path = window.location.hash.slice(1) || "/home";

  const match = matchRoute(path);

  if (match) {
    store.dispatch({
      type: "ROUTE_CHANGED",
      payload: {
        path,
        params: match.params,
      },
    });

    renderRoute(match);
  }
}
