import { isBetween } from "./math_utils";

/** An integer in the range [0, 255] inclusive */
export type Byte = number & { readonly __brand: "byte" };

export const makeByte = (n: number): Byte => {
  if (!Number.isInteger(n) || !isBetween(n, 0, 255))
    throw new Error("A Byte must be an integer between 0 and 255");

  return n as Byte;
};

/** A real number in the range [0, 1] inclusive */
export type Normalized = number & { readonly __brand: "normalized" };

export const makeNormalized = (n: number): Normalized => {
  if (!isBetween(n, 0.0, 1.0))
    throw new Error("A normalized number must be a real number between 0 and 1");

  return n as Normalized;
};

/** A real number in the range [0, 360], inclusive */
export type CircleDegree = number & { readonly __brand: "degree" };

export const makeCircleDegree = (n: number): CircleDegree => {
  if (!isBetween(n, 0, 360))
    throw new Error("A circle degree must be a real number in the range [0, 360]");

  return n as CircleDegree;
};

/** A real number in the range [0, 100], inclusive */
export type Number0To100 = number & { readonly __brand: "0To100" };

export const makeNumber0To100 = (n: number): Number0To100 => {
  if (!isBetween(n, 0, 100))
    throw new Error("Must be a real number in the range [0, 100], inclusive");

  return n as Number0To100;
};
