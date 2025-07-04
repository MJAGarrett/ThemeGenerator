import { describe, it, expect } from "vitest";
import { makeHSLColor, makeHSLColorNormalized, isNormalized, isDenormalized, formatHSLString } from "../../src/color/HSL";

describe("HSL", () => {
  const HSLNormalized = makeHSLColorNormalized(180, 0.5, 0.5);
  const HSLDenormalized = makeHSLColor(180, 50, 50);

  describe("isNormalized", () => {
    it("should return true when given a normalized hsl color", () => {
      expect(isNormalized(HSLNormalized)).toBe(true);
    });

    it("should return false when given a denormalized hsl color", () => {
      expect(isNormalized(HSLDenormalized)).toBe(false);
    });
  });

  describe("isDenormalized", () => {
    it("should return true when given a denormalized hsl color", () => {
      expect(isDenormalized(HSLNormalized)).toBe(false);
    });

    it("should return false when given a normalized hsl color", () => {
      expect(isDenormalized(HSLDenormalized)).toBe(true);
    });
  });

  describe("formatHSLString", () => {
    const expected = "hsl(180.00, 50.00%, 50.00%)";

    it("should format a normalized hsl color", () => {
      expect(formatHSLString(HSLNormalized, 2)).toStrictEqual(expected);
    });

    it("should format a denormalized hsl color", () => {
      expect(formatHSLString(HSLDenormalized, 2)).toStrictEqual(expected);
    });
  });
});
