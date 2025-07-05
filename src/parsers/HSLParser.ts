import { HSLColor, makeHSLColor } from "../color/HSL";
import { bind, none, some } from "../Monads/Optional";
import { alternative, finishParse, ignoreWhitespace, parseNumber, Parser, scanLetter, seqL, seqR } from "./utils";

const hslParser_imp: Parser<HSLColor> = (string) => {
  const liftedIgnoreWS = (str: string) => some(ignoreWhitespace(str));

  const ignoreWSBefore = <T>(p: Parser<T>): Parser<T> => {
    return seqR(liftedIgnoreWS)(p);
  };

  return bind(seqR(scanHSLLiteral)(ignoreWSBefore(parseNumber))(string),
    ({ string, result }) => {
      const hue = result;
      const r2 = seqR(ignoreWSBefore(scanLetter(",")))(ignoreWSBefore(parsePercent))(string);

      return bind(r2,
        ({ string, result }) => {

          const sat = result;
          const r3 = seqR(ignoreWSBefore(scanLetter(",")))(ignoreWSBefore(parsePercent))(string);

          return bind(r3, ({ string, result }) => {
            const lightness = result;

            return bind(seqL(ignoreWSBefore(scanLetter(")")))(liftedIgnoreWS)(string),
              (r4) => {
                try {
                  return some({
                    string: r4.string,
                    result: makeHSLColor(hue, sat, lightness),
                  });
                }
                catch {
                  return none();
                }
              });
          });
        });
    },
  );

};

const scanHSLLiteral: Parser<string> = (() => {
  const scanH = alternative(scanLetter("h"))(scanLetter("H"));
  const scanS = alternative(scanLetter("s"))(scanLetter("S"));
  const scanL = alternative(scanLetter("l"))(scanLetter("L"));
  const scanOpeningParen = scanLetter("(");

  return seqR(seqR(scanH)(seqR(scanS)(scanL)))(scanOpeningParen);
})();

const parsePercent = seqL(parseNumber)(scanLetter("%"));


const hslParser = finishParse(hslParser_imp);

export default hslParser;
