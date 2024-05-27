import { isCityNameDuplicate } from "./city";

describe("isCityNameDuplicate", () => {
  it("should return true when city is duplicate", () => {
    const result = isCityNameDuplicate("York");
    expect(result).toEqual(true);
  });

  it("should return false when city is unique", () => {
    const result = isCityNameDuplicate("New York");
    expect(result).toEqual(false);
  });
});
