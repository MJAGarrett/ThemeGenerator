import { type RGBColor } from "../color/RGB";
import { alternative, finishParse, nTimes, parseHexDigit, scanLetter, seq, seqR, type Parser } from "./utils";

const rgbParser6Digits: Parser<RGBColor> = (string: string) => {
  const parseTwoDigits = (string: string) => {
    const res = seq(parseHexDigit)(parseHexDigit)(string);
    if (res) {
      const [ d1, d2 ] = res.result;
      return {
        string: res.string,
        result: d1 * 16 + d2,
      };
    }
    return null;
  };

  const res = seqR(scanLetter("#"))(nTimes(3)(parseTwoDigits))(string);

  if (res) {
    const [ red, green, blue ] = res.result.flat();

    return {
      string: res.string,
      result: {
        kind: "denormalized",
        red,
        green,
        blue,
      },
    };
  }

  return null;
};

const rgbParser3Digits: Parser<RGBColor> = (string: string) => {
  const res = seqR(scanLetter("#"))(nTimes(3)(parseHexDigit))(string);

  if (res) {
    const [ red, green, blue ] = res.result.flat();

    return {
      string: res.string,
      result: {
        kind: "denormalized",
        red: red * 16 + red,
        green: green * 16 + green,
        blue: blue * 16 + blue,
      },
    };
  }

  return null;
};

const rgbParser: (str: string) => RGBColor | null =
  finishParse(alternative(rgbParser6Digits)(rgbParser3Digits));

export default rgbParser;
