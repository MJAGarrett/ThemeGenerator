import { extract, isSome, none, Optional, some } from "../Monads/Optional";

export interface ParseResult<T> {
  readonly string: string;
  readonly result: T;
}

export type Parser<T> = (str: string) => ParseResult<T> | null;

export const skipWhitespaceBetween = <T>(p1: Parser<T>) => {
  return seqR(ignoreWhitespace)(seqL(p1)(ignoreWhitespace));
};

export const alternative = <T>(p1: Parser<T>) => <U>(p2: Parser<U>) => (string: string) => {
  const r1 = p1(string);
  if (r1) return r1;
  return p2(string);
};

export const seq = <T>(p1: Parser<T>) => <U>(p2: Parser<U>) => (state: string) => {
  const r1 = p1(state);
  if (r1) {
    const r2 = p2(r1.string);
    if (!r2) return null;

    return {
      string: r2.string,
      result: [ r1.result, r2.result ],
    };
  }

  return null;
};

export const seqL = <T>(p1: Parser<T>) => <U>(p2: Parser<U>) => (string: string) => {
  const r1 = p1(string);
  if (r1) {
    const r2 = p2(r1.string);
    if (r2) return {
      string: r2.string,
      result: r1.result,
    };
  }

  return null;
};

export const seqR = <T>(p1: Parser<T>) => <U>(p2: Parser<U>) => (string: string) => {
  const r1 = p1(string);
  if (r1) {
    return p2(r1.string);
  }

  return null;
};

export const scanLetter = (letter: string) => (string: string) => {
  if (string.length > 0 && string[0] === letter)
    return { string: string.slice(1), result: string[0] };

  return null;
};

const parseDigit = (string: string) => {
  if (string.length > 0 && !Number.isNaN(parseInt(string[0])))
    return { string: string.slice(1), result: parseInt(string[0]) };

  return null;
};

export const parseNumber = (string: string) => {
  const negative = optional(scanLetter("-"))(string);

  const r1 = oneOrMore(parseDigit)(negative.string);
  if (!r1) return null;
  let number = r1.result.reduce((acc, curr) => acc * 10 + curr);

  const r2 = optional(seqR(scanLetter("."))(oneOrMore(parseDigit)))(r1.string);

  if (isSome(r2.result)) {
    const lower =
      extract(r2.result)
        .filter((v) => typeof v === "number")
        .reverse()
        .reduce((acc, curr) => curr + acc * 0.1) * 0.1;
    number += lower;
  }
  if (isSome(negative.result)) number *= -1;

  return {
    string: isSome(r2.result) ? r2.string : r1.string,
    result: number,
  };
};

export const whitespace = (string: string) => {
  if (string.length > 0 && string[0].match(/^\s$/))
    return { string: string.slice(1), result: string[0] };

  return null;
};

export const optional = <T>(p: Parser<T>) => (string: string): ParseResult<Optional<T>> => {
  const res = p(string);

  if (!res)
    return { string, result: none() };
  return {
    string: res.string,
    result: some(res.result),
  };
};

export const oneOrMore = <T>(p: Parser<T>) => (string: string) => {
  const ret = [];
  let lastStr = string.slice(0);
  let res = p(string);
  while (res) {
    ret.push(res.result);
    lastStr = res.string;
    res = p(res.string);
  }
  if (ret.length === 0) return null;

  return { string: lastStr, result: ret };
};

export const zeroOrMore = <T>(p: Parser<T>) => {
  return optional(oneOrMore(p));
};

export const ignoreWhitespace = zeroOrMore(whitespace);

export const parseHexDigit = (string: string) => {
  if (string.length === 0) return null;

  const digit = parseInt(string[0], 16);

  if (Number.isNaN(digit)) return null;

  return {
    string: string.slice(1),
    result: digit,
  };
};

export const liftArray = <T>(p: Parser<T>) => (str: string): ParseResult<T[]> | null => {
  const res = p(str);
  if (res) {
    return {
      ...res,
      result: [ res.result ],
    };
  }

  return null;
};

export const flatten = <T>(arr: (T | T[])[]): T[] => {
  return arr.flatMap((val) => Array.isArray(val) ? val : [ val ]);
};

export const nTimes = (n: number) => <T>(p: Parser<T>): Parser<T[]> => (string: string) => {
  if (n <= 0) return null;
  if (n === 1) return liftArray(p)(string);

  const res = seq(p)(nTimes(n -1)(p))(string);

  if (!res) return null;

  return {
    ...res,
    result: flatten(res.result),
  };

};

export const finishParse = <T>(p: Parser<T>) => (string: string): T | null => {
  const res = p(string);
  if (res && res.string.length === 0) {
    return res.result;
  }

  return null;
};
