import { HSLColor, makeHSLColor } from "../color/HSL";
import { alternative, finishParse, parseNumber, Parser, scanLetter, seqL, seqR, skipWhitespaceBetween } from "./utils";

const hslParser_imp: Parser<HSLColor> = (string) => {
  const r1 =
    seqR(scanHSLLiteral)(seqR(scanLetter("("))(skipWhitespaceBetween(parseNumber)))(string);
  if (!r1) return null;

  const r2 =
    seqR(
      skipWhitespaceBetween(scanLetter(",")))(
      parsePercent)(
      r1.string);

  if (!r2) return null;

  const r3 =
    seqR(
      skipWhitespaceBetween(scanLetter(",")))(
      seqL(parsePercent)(skipWhitespaceBetween(scanLetter(")"))))(
      r2.string);

  if (!r3) return null;

  try {
    return {
      string: r3.string,
      result: makeHSLColor(r1.result, r2.result, r3.result),
    };
  }
  catch {
    return null;
  }
};

const scanHSLLiteral: Parser<string> = (() => {
  const scanH = alternative(scanLetter("h"))(scanLetter("H"));
  const scanS = alternative(scanLetter("s"))(scanLetter("S"));
  const scanL = alternative(scanLetter("l"))(scanLetter("L"));

  return seqR(scanH)(seqR(scanS)(scanL));
})();

const parsePercent = seqL(parseNumber)(scanLetter("%"));


const hslParser = finishParse(hslParser_imp);

export default hslParser;
