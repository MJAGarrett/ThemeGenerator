import { describe, expect, it } from "vitest";
import { formatRGBString, isDenormalized, isNormalized, makeRGBColor, makeRGBColorNormalized } from "../../src/color/RGB";

describe("RGB", () => {

  // The below two functions are so trivial and all functions they defer to have been tested,
  // so we are omitting testing them specifically.
  const colorNormalized = makeRGBColorNormalized(15 / 255, 10 / 255, (11 * 16 + 11) / 255);
  const colorDenormalized = makeRGBColor(15, 10, 11 * 16 + 11);

  describe("formatRGBString", () => {
    const expected = "#0f0abb";

    it("should format normalized RGB colors", () => {
      expect(formatRGBString(colorNormalized)).toStrictEqual(expected);
    });

    it("should format denormalized RGB colors", () => {
      expect(formatRGBString(colorDenormalized)).toStrictEqual(expected);
    });
  });

  describe("isNormalized", () => {
    it("should return false when given a denormalized color", () => {
      expect(isNormalized(colorDenormalized)).toBe(false);
    });

    it("should return true when given a normalized color", () => {
      expect(isNormalized(colorNormalized)).toBe(true);
    });
  });

  describe("isDenormalized", () => {
    it("should return false when given a normalized color", () => {
      expect(isDenormalized(colorNormalized)).toBe(false);
    });

    it("should return true when given a denormalized color", () => {
      expect(isDenormalized(colorDenormalized)).toBe(true);
    });
  });
});
