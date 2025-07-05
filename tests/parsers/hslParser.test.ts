import { describe, expect, it } from "vitest";
import hslParser from "../../src/parsers/HSLParser";
import { HSLColor, makeHSLColor } from "../../src/color/HSL";
import { assertIsNone, assertIsSome } from "../test_utils/test_utils";
import { Optional } from "../../src/Monads/Optional";

describe("HSL Parser", () => {
  it("Valid HSL strings should parse", () => {
    const validStringsAndTheirValues: [string, HSLColor][] = [
      [ "hsl(0, 0%, 0%)", makeHSLColor(0, 0, 0) ],
      [ "hsl(  350  , 30% , 40%  )", makeHSLColor(350, 30, 40) ],
      [ "hsl(  3350  , 30% , 40%  )", makeHSLColor(3350, 30, 40) ],
    ];

    const results = validStringsAndTheirValues.map(
      ([ str, expectedColor ]): [Optional<HSLColor>, HSLColor] => [ hslParser(str), expectedColor ]);

    const isSameColor = (c1: HSLColor, c2: HSLColor): boolean => {
      return c1.hue === c2.hue &&
        c1.saturation === c2.saturation &&
        c1.lightness === c2.lightness;
    };

    for (const [ actual, expected ] of results) {
      assertIsSome(actual);
      expect(isSameColor(actual.payload, expected)).toBeTruthy();
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
      "hsl(0, 410%, 0%)", // Percent value greater than 100
    ];

    const results = invalidHSLStrings.map(hslParser);

    for (const res of results) assertIsNone(res);
  });

});
