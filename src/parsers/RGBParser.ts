import { makeRGBColor, type RGBColor } from "../color/RGB";
import { bind, map, none, Optional, some } from "../Monads/Optional";
import { alternative, finishParse, nTimes, parseHexDigit, scanLetter, seq, seqR, type Parser } from "./utils";

const rgbParser6Digits: Parser<RGBColor> = (string: string) => {
  const parseTwoDigits: Parser<number> = (string) => {
    return map(seq(parseHexDigit)(parseHexDigit)(string), ({ string, result }) => {
      const [ d1, d2 ] = result;
      return {
        string,
        result: d1 * 16 + d2,
      };
    });
  };

  return bind(seqR(scanLetter("#"))(nTimes(3)(parseTwoDigits))(string), ({ string, result }) => {
    const [ red, green, blue ] = result;

    try {
      return some({
        string,
        result: makeRGBColor(red, green, blue),
      });
    }
    catch {
      return none();
    }
  });
};

const rgbParser3Digits: Parser<RGBColor> = (string: string) => {
  return bind(seqR(scanLetter("#"))(nTimes(3)(parseHexDigit))(string), ({ string, result }) => {
    const [ red, green, blue ] = result;

    try {
      return some({
        string,
        result: makeRGBColor(
          red * 16 + red,
          green * 16 + green,
          blue * 16 + blue,
        ),
      });
    }
    catch {
      return none();
    }
  });
};

const rgbParser: (str: string) => Optional<RGBColor> =
  finishParse(alternative(rgbParser6Digits)(rgbParser3Digits));

export default rgbParser;
