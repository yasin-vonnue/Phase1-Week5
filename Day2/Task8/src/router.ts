interface Route {
  path: string;
  component: (params: Record<string, string>) => HTMLElement;
}

const routes: Route[] = [];

export function register(
  path: string,
  component: (param: Record<string, string>) => HTMLElement,
): void {
  routes.push({
    path,
    component,
  });
}

export function navigate(
  path: string,
  params: Record<string, string> = {},
): void {
  const route = routes.find((item) => item.path === path);

  if (!route) {
    console.error(`Route not found: ${path}`);
    return;
  }

  const element = route.component(params);

  const root = document.getElementById("app");

  if (root) {
    root.replaceChildren(element);
  }
}

function homePage(): HTMLElement {
  const element = document.createElement("div");
  element.textContent = "Home Page";
  return element;
}

function userPage(params: Record<string, string>): HTMLElement {
  const element = document.createElement("div");
  element.textContent = `User: ${params.id}`;
  return element;
}

register("/home", homePage);
register("/user", userPage);

navigate("/home");

navigate("/user", {
  id: "42",
});
