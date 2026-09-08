export class ApiClient {
  constructor(private readonly baseUrl: string) {}

  /**
   * Sends a GET request and converts the response to the requested type.
   *
   * @typeParam T - The expected type of the response data.
   * @param endpoint - The API endpoint appended to the base URL.
   * @returns A promise containing the response data typed as T.
   * @throws {Error} If the HTTP response is not successful.
   */
  async get<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }
}
