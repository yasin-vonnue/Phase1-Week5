export async function fetchJSON(
  url: string,
  options: RequestInit = {},
): Promise<unknown> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
}
