import { describe, expect, it, vi } from "vitest";
import { ApiClient } from "../src/utils/ApiClient.js";
import { mock } from "node:test";

describe("ApiClient", () => {
  it("returns correctly typed response data", async () => {
    type User = {
      id: number;
      name: string;
    };

    const mockUser: User = {
      id: 1,
      name: "Arthur",
    };

    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => mockUser,
      }),
    );

    const client = new ApiClient("https://example.com");

    const user = await client.get<User>("/users/1");

    expect(user).toEqual(mockUser);
    expect(user.id).toBe(1);
    expect(user.name).toBe("Arthur");

    vi.unstubAllGlobals();
  });
});
