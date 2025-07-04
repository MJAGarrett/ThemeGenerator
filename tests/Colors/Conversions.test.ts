import { describe, it, expect } from "vitest";
import { makeRGBColorNormalized, RGBColorNormalized } from "../../src/color/RGB";
import { HSLColorNormalized, makeHSLColorNormalized } from "../../src/color/HSL";
import { HSLToRGB, RGBToHSL } from "../../src/color/Conversions";

describe("Conversions", () => {
  const colors: [RGBColorNormalized, HSLColorNormalized][] = [
    [ makeRGBColorNormalized(1.0, 1.0, 1.0), makeHSLColorNormalized(0.0, 0.0, 1.0) ],
    [ makeRGBColorNormalized(0.0, 0.0, 0.0), makeHSLColorNormalized(0.0, 0.0, 0.0) ],
    [ makeRGBColorNormalized(1.0, 0.0, 0.0), makeHSLColorNormalized(0.0, 1.0, 0.5) ],
    [ makeRGBColorNormalized(0.0, 1.0, 0.0), makeHSLColorNormalized(120.0, 1.0, 0.5) ],
    [ makeRGBColorNormalized(0.0, 0.0, 1.0), makeHSLColorNormalized(240.0, 1.0, 0.5) ],
    [ makeRGBColorNormalized(0.5, 1.0, 0), makeHSLColorNormalized(90.0, 1.0, 0.5) ],
    [ makeRGBColorNormalized(0.0, 1.0, 1.0), makeHSLColorNormalized(180.0, 1.0, 0.5) ],
    [ makeRGBColorNormalized(1.0, 0.0, 1.0), makeHSLColorNormalized(300.0, 1.0, 0.5) ],
  ];

  describe("RGBToHSL", () => {
    it("should return a corresponding color", () => {
      for (const [ rgb, hsl ] of colors) expect(RGBToHSL(rgb)).toStrictEqual(hsl);
    });
  });

  describe("HSLToRGB", () => {
    it("should return a corresponding color", () => {
      for (const [ rgb, hsl ] of colors) expect(HSLToRGB(hsl)).toStrictEqual(rgb);
    });
  });
});
