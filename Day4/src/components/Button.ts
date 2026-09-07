type ButtonOptions = {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
};

export function Button({
  text,
  type = "button",
  className = "",
}: ButtonOptions): HTMLButtonElement {
  const button = document.createElement("button");

  button.type = type;
  button.textContent = text;
  button.className = className;

  return button;
}
