import { describe, expect, it } from "vitest";
import { clamp, isBetween } from "../../src/utils/math_utils";

describe("Math Utils", () => {

  describe("clamp", () => {
    const curried = (v: number) => clamp(v, 0, 100);

    it("should return the lower bound when the value is below it", () => {
      expect(curried(-12)).toBe(0);
    });

    it("should return the value when it is between the upper and lower bound", () => {
      expect(curried(54)).toBe(54);
    });

    it("should return the upper bound when the value is above it", () => {
      expect(curried(1002)).toBe(100);
    });
  });

  describe("isBetween", () => {
    const curried = (v: number) => isBetween(v, 0, 100);

    it("should return false if the item is not between the lower and upper bound", () => {
      expect(curried(-12)).toBe(false);
    });

    it("should return true if the item is between the lower and upper bound", () => {
      expect(curried(12)).toBe(true);
    });

    it("should throw if the lower bound is above the upper bound", () => {
      expect(() => isBetween(10, 20, 10)).toThrow();
    });
  });
});
