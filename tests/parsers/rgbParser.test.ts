import { makeRGBColor, RGBColor } from "../../src/color/RGB";
import rgbParser from "../../src/parsers/RGBParser";

import { it, expect, describe } from "vitest";
import { assertIsNonNull } from "../test_utils/test_utils";

describe("RGB Parsing", () => {
  const invalidRGBStrings = [
    "421fad", // missing #
    "#44", // Too short
    "#3314", // Too long for 3 value form and too short for 6 value form
    "#faefaee", // Too long
    "#aafaaz", // Invalid character used
  ];

  const validRGBStringsAndTheirColorValues: [string, RGBColor][] = [
    [ "#123456", makeRGBColor(18, 52, 86) ],
    [ "#Fae", makeRGBColor(255, 170, 238) ],
    [ "#abcdef", makeRGBColor(171, 205, 239) ],
    [ "#ABCDEF", makeRGBColor(171, 205, 239) ],
  ];

  it("Invalid rgb strings should return a null value", () => {
    const results = invalidRGBStrings.map(rgbParser);

    for (const res of results) expect(res).toBeNull();
  });

  it("Valid rgb strings should return a color value", () => {
    const results = validRGBStringsAndTheirColorValues.map(
      ([ str, expectedColor ]): [RGBColor | null, RGBColor] => [ rgbParser(str), expectedColor ],
    );

    const isSameColor = (color1: RGBColor, color2: RGBColor): boolean => {
      return color1.red === color2.red &&
        color1.green === color2.green &&
        color1.blue === color2.blue;
    };

    for (const [ actual, expected ] of results) {
      assertIsNonNull(actual);
      expect(isSameColor(actual, expected)).toBeTruthy();
    }
  });
});
