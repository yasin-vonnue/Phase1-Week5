const element = document.querySelector("#app");

if (!element) {
  throw new Error("App element not found");
}

element.textContent = "Hello";

function greet(name: string): string {
  return `Hello ${name}`;
}

greet("Arthur");
