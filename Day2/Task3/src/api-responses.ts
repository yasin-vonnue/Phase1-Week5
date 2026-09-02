// 1. ApiResponse<T>
type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: string;
      statusCode: number;
    };

// 2. handleResponse<T>
function handleResponse<T>(response: ApiResponse<T>): void {
  if (response.success) {
    console.log("Success:", response.data);
  } else {
    console.log(`Error ${response.statusCode}: ${response.error}`);
  }
}

handleResponse<string>({
  success: true,
  data: "User loaded successfully",
});

handleResponse<string>({
  success: false,
  error: "User not found",
  statusCode: 404,
});

// User type
interface User {
  id: string;
  name: string;
  email: string;
}

// 3. LoadingState<T>
type LoadingState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; error: Error };

// 4. Use LoadingState<User[]>
function renderUsers(state: LoadingState<User[]>): string {
  switch (state.status) {
    case "idle":
      return "<p>Waiting...</p>";

    case "loading":
      return "<p>Loading users...</p>";

    case "success":
      return `<ul>${state.data
        .map((user) => `<li>${user.name}</li>`)
        .join("")}</ul>`;

    case "error":
      return `<p>Error: ${state.error.message}</p>`;
  }
}

// Test each state
console.log(renderUsers({ status: "idle" }));

console.log(renderUsers({ status: "loading" }));

console.log(
  renderUsers({
    status: "success",
    data: [
      {
        id: "1",
        name: "Arthur",
        email: "arthur@example.com",
      },
      {
        id: "2",
        name: "Dutch",
        email: "dutch@example.com",
      },
    ],
  }),
);

console.log(
  renderUsers({
    status: "error",
    error: new Error("Failed to load users"),
  }),
);
