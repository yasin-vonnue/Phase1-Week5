// Generic fetchJSON helper
async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

// Types for interceptors
type RequestInterceptor = (
  url: string,
  options: RequestInit,
) => { url: string; options: RequestInit };

type ResponseInterceptor = <T>(data: T) => T;

// API Client interface
interface IApiClient {
  get<T>(path: string): Promise<T>;
  post<T, B>(path: string, body: B): Promise<T>;
  put<T, B>(path: string, body: B): Promise<T>;
  delete<T>(path: string): Promise<T>;
}

// 1. Generic ApiClient
class ApiClient implements IApiClient {
  private requestInterceptors: RequestInterceptor[] = [];
  private responseInterceptors: ResponseInterceptor[] = [];

  constructor(private baseUrl: string) {}

  // 3. Request interceptor
  addRequestInterceptor(interceptor: RequestInterceptor): void {
    this.requestInterceptors.push(interceptor);
  }

  // 3. Response interceptor
  addResponseInterceptor(interceptor: ResponseInterceptor): void {
    this.responseInterceptors.push(interceptor);
  }

  private async request<T>(
    path: string,
    options: RequestInit = {},
  ): Promise<T> {
    let url = `${this.baseUrl}${path}`;
    let requestOptions = options;

    for (const interceptor of this.requestInterceptors) {
      const result = interceptor(url, requestOptions);
      url = result.url;
      requestOptions = result.options;
    }

    let data = await fetchJSON<T>(url, requestOptions);

    for (const interceptor of this.responseInterceptors) {
      data = interceptor(data);
    }

    return data;
  }

  // 1 & 2. GET
  get<T>(path: string): Promise<T> {
    return this.request<T>(path, {
      method: "GET",
    });
  }

  // 1 & 2. POST
  post<T, B>(path: string, body: B): Promise<T> {
    return this.request<T>(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  // 1 & 2. PUT
  put<T, B>(path: string, body: B): Promise<T> {
    return this.request<T>(path, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  // 1 & 2. DELETE
  delete<T>(path: string): Promise<T> {
    return this.request<T>(path, {
      method: "DELETE",
    });
  }
}

// 4. Mock API Client
class MockApiClient implements IApiClient {
  private data: unknown;

  constructor(data: unknown) {
    this.data = data;
  }

  get<T>(_path: string): Promise<T> {
    return Promise.resolve(this.data as T);
  }

  post<T, B>(_path: string, _body: B): Promise<T> {
    return Promise.resolve(this.data as T);
  }

  put<T, B>(_path: string, _body: B): Promise<T> {
    return Promise.resolve(this.data as T);
  }

  delete<T>(_path: string): Promise<T> {
    return Promise.resolve(this.data as T);
  }
}

// Example types
interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUser {
  name: string;
  email: string;
}

// Test real API client
const api = new ApiClient("https://jsonplaceholder.typicode.com");

// Request interceptor
api.addRequestInterceptor((url, options) => {
  console.log("Request:", url);

  return {
    url,
    options,
  };
});

// Response interceptor
api.addResponseInterceptor(<T>(data: T): T => {
  console.log("Response received");

  return data;
});

// Generic GET
api.get<User>("/users/1").then((user) => {
  console.log(user.name);
});

// Generic POST
api
  .post<User, CreateUser>("/users", {
    name: "Arthur",
    email: "arthur@example.com",
  })
  .then((user) => {
    console.log(user);
  });

// Test MockApiClient
const mockClient = new MockApiClient({
  id: 1,
  name: "Dutch",
  email: "dutch@example.com",
});

mockClient.get<User>("/users/1").then((user) => {
  console.log("Mock user:", user.name);
});
