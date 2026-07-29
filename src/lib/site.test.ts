import { describe, expect, it } from "vitest";
import { applicationHref } from "./site";

describe("applicationHref", () => {
  it("adds privacy-safe campaign context", () => {
    const result = new URL(applicationHref("hero-hotel", "hotel"));
    expect(result.searchParams.get("utm_content")).toBe("hero-hotel");
    expect(result.searchParams.get("financing_goal")).toBe("hotel");
    expect(result.searchParams.has("email")).toBe(false);
  });
});
