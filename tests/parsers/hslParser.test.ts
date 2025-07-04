import { describe, expect, it } from "vitest";
import hslParser from "../../src/parsers/HSLParser";
import { HSLColor } from "../../src/color/HSL";
import { assertIsNonNull } from "../utils/test_utils";

describe("HSL Parser", () => {
  it("Valid HSL strings should parse", () => {
    const validStringsAndTheirValues: [string, HSLColor][] = [
      [ "hsl(0, 0%, 0%)", { kind: "denormalized", hue: 0, lightness: 0, saturation: 0 }],
      [ "hsl(  350  , 30% , 40%  )", { kind: "denormalized", hue: 350, lightness: 40, saturation: 30 }],
      [ "hsl(  3350  , 30% , 40%  )", { kind: "denormalized", hue: 3350, lightness: 40, saturation: 30 }],
    ];

    const results = validStringsAndTheirValues.map(
      ([ str, expectedColor ]): [HSLColor | null, HSLColor] => [ hslParser(str), expectedColor ]);

    const isSameColor = (c1: HSLColor, c2: HSLColor): boolean => {
      return c1.hue === c2.hue &&
        c1.saturation === c2.saturation &&
        c1.lightness === c2.lightness;
    };

    for (const [ actual, expected ] of results) {
      assertIsNonNull(actual);
      expect(isSameColor(actual, expected)).toBeTruthy();
    }
  });

  it("Invalid HSL strings should not parse", () => {
    const invalidHSLStrings = [
      "hsl(44, 23%, 32%", // Missing closing )
      "hl(0, 0%, 0%)", // Misspelled hsl
      "hsl 0, 0%, 0%)", // Missing opening (
      "hsl(0, 0%, 0%,)", // Extra ,
      "hsl(0, 0, 0%)", // Missing %
      "hsl(, 0%, 0%)", // Missing hue
    ];

    const results = invalidHSLStrings.map(hslParser);

    for (const res of results) expect(res).toBeNull();
  });
});
