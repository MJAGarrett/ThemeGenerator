import { bind, isNone, isSome, map, none, Optional, some } from "../Monads/Optional";

export interface ParseResult<T> {
  readonly string: string;
  readonly result: T;
}

export type Parser<T> = (str: string) => Optional<ParseResult<T>>;

// export const skipWhitespaceBetween = <T>(p1: Parser<T>): Parser<T> => {
//   return seqR(ignoreWhitespace)(seqL(p1)(ignoreWhitespace));
// };

export const alternative = <T>(p1: Parser<T>) => <U>(p2: Parser<U>): Parser<T | U> => (string) => {
  const r1 = p1(string);
  return isSome(r1) ? r1 : p2(string);
};

export const seq = <T>(p1: Parser<T>) => <U>(p2: Parser<U>): Parser<(T | U)[]> => (state) => {
  const combineResults = (r1: ParseResult<T>, r2: ParseResult<U>): ParseResult<(T | U)[]> => {
    return {
      string: r2.string,
      result: [ r1.result, r2.result ],
    };
  };

  return bind(p1(state), (r1) =>
    map(p2(r1.string), (r2) => combineResults(r1, r2)),
  );
};

export const seqL = <T>(p1: Parser<T>) => <U>(p2: Parser<U>): Parser<T> => (string) => {

  const pickL = (r1: ParseResult<T>, r2: ParseResult<U>): ParseResult<T> => ({
    string: r2.string,
    result: r1.result,
  });

  return bind(p1(string), (r1) => map(p2(r1.string), (r2) => pickL(r1, r2)));
};

export const seqR = <T>(p1: Parser<T>) => <U>(p2: Parser<U>): Parser<U> => (string) => {
  const pickR = (_: ParseResult<T>, b: ParseResult<U>): ParseResult<U> => b;

  return bind(p1(string), (a) => map(p2(a.string), (b) => pickR(a, b)));
};

export const scanLetter = (letter: string): Parser<string> => (string) => {
  if (string.length > 0 && string[0] === letter)
    return some({ string: string.slice(1), result: string[0] });

  return none();
};

const parseDigit: Parser<number> = (string: string) => {
  if (string.length > 0 && !Number.isNaN(parseInt(string[0])))
    return some({ string: string.slice(1), result: parseInt(string[0]) });

  return none();
};

export const parseNumber: Parser<number> = (string: string) => {
  const negative = optional(scanLetter("-"))(string);

  return bind(oneOrMore(parseDigit)(negative.string), (r1) => {
    const decimals = optional(seqR(scanLetter("."))(oneOrMore(parseDigit)))(r1.string);

    let number = r1.result.reduce((acc, curr) => acc * 10 + curr);
    if (isSome(decimals.result)) {
      const lower = decimals.result.payload
        .filter((v) => typeof v === "number")
        .reverse()
        .reduce((acc, curr) => curr + acc * 0.1)
        * 0.1;

      number += lower;
    }
    if (isSome(negative.result)) number *= -1;

    return some({
      string: isSome(decimals.result) ? decimals.string : r1.string,
      result: number,
    });
  });
};

export const whitespace: Parser<string> = (string) => {
  if (string.length > 0 && string[0].match(/^\s$/))
    return some({ string: string.slice(1), result: string[0] });

  return none();
};

export const optional = <T>(p: Parser<T>) => (string: string): ParseResult<Optional<T>> => {
  const res = p(string);

  if (isNone(res))
    return { string, result: none() };

  return {
    string: res.payload.string,
    result: some(res.payload.result),
  };
};

export const oneOrMore = <T>(p: Parser<T>): Parser<T[]> => (string) => {
  const ret = [];
  let lastStr = string.slice(0);
  let res = p(string);
  while (isSome(res)) {
    ret.push(res.payload.result);
    lastStr = res.payload.string;
    res = p(res.payload.string);
  }
  if (ret.length === 0) return none();

  return some({ string: lastStr, result: ret });
};

export const zeroOrMore = <T>(p: Parser<T>) => {
  return optional(oneOrMore(p));
};

export const ignoreWhitespace = zeroOrMore(whitespace);

export const parseHexDigit: Parser<number> = (string: string) => {
  if (string.length === 0) return none();

  const digit = parseInt(string[0], 16);

  if (Number.isNaN(digit)) return none();

  return some({
    string: string.slice(1),
    result: digit,
  });
};

export const liftArray = <T>(p: Parser<T>): Parser<T[]> => (str) => {
  return map(p(str), (a) => ({ ...a, result: [ a.result ] }));
};

export const flatten = <T>(arr: (T | T[])[]): T[] => {
  return arr.flatMap((val) => Array.isArray(val) ? val : [ val ]);
};

export const nTimes = (n: number) => <T>(p: Parser<T>): Parser<T[]> => (string: string) => {
  if (n <= 0) return none();
  if (n === 1) return liftArray(p)(string);

  const combineResults = <T>(t: T, arr: T[]): T[] => [ t, ...arr ];

  return bind(p(string), (a) =>
    map(nTimes(n - 1)(p)(a.string), (b) =>
      ({ string: b.string, result: combineResults(a.result, b.result) })),
  );
};

export const finishParse = <T>(p: Parser<T>) => (string: string): Optional<T> => {
  return bind(p(string), (res) => res.string === "" ? some(res.result) : none());
};
