type CardOptions = {
  title: string;
  content: string;
};

export function Card({
  title,
  content,
}: CardOptions): HTMLElement {
  const card = document.createElement("article");

  const heading = document.createElement("h2");
  heading.textContent = title;

  const paragraph = document.createElement("p");
  paragraph.textContent = content;

  card.append(heading, paragraph);

  return card;
}
