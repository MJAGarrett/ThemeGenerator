import { clamp } from "../utils/math_utils";
import { Byte, makeByte, makeNormalized, Normalized } from "../utils/number_types";

/**
 * An RGBColor should have 3 fields for red, green, and blue. Each color
 * should be in the range [0, 255].
 */
export interface RGBColor {
  kind: "denormalized";
  readonly red: Byte;
  readonly green: Byte;
  readonly blue: Byte;
}

/**
 * A color in RGB format with each channel represented by a
 * real number in the range [0, 1], inclusive.
 */
export interface RGBColorNormalized {
  kind: "normalized";
  readonly red: Normalized;
  readonly green: Normalized;
  readonly blue: Normalized;
}

type RGB = RGBColor | RGBColorNormalized;

/**
 * Creates a denormalized RGBColor. Throws if any of the provided
 * constituent colors are not an integer in the range [0, 255].
 * @param red An integer in the range [0, 255]
 * @param green An integer in the range [0, 255]
 * @param blue An integer in the range [0, 255]
 * @returns An RGBColor
 */
export const makeRGBColor = (red: number, green: number, blue: number): RGBColor => {
  return {
    kind: "denormalized",
    red: makeByte(red),
    green: makeByte(green),
    blue: makeByte(blue),
  };
};

/**
 * Creates a normalized RGBColor.
 * @param red A real number in the range [0, 1]
 * @param green A real number in the range [0, 1]
 * @param blue A real number in the range [0, 1]
 * @returns A RGBColorNormalized
 *
 * @throws if any of the provided
 * constituent colors are not a real number in the range [0, 1].
 */
export const makeRGBColorNormalized =
  (red: number, green: number, blue: number): RGBColorNormalized => {
    return {
      kind: "normalized",
      red: makeNormalized(red),
      green: makeNormalized(green),
      blue: makeNormalized(blue),
    };
  };


export const normalizeRGB = ({ red, green, blue }: RGBColor): RGBColorNormalized => {
  const normalizeValue = (n: number) => makeNormalized(clamp(n, 0, 255) / 255);

  return {
    kind: "normalized",
    red: normalizeValue(red),
    green: normalizeValue(green),
    blue: normalizeValue(blue),
  };
};

export const denormalizeRGB = ({ red, green, blue }: RGBColorNormalized): RGBColor => {
  const denormalizeValue = (n: number): Byte => makeByte(Math.round(n * 255));

  return {
    kind: "denormalized",
    red: denormalizeValue(red),
    green: denormalizeValue(green),
    blue: denormalizeValue(blue),
  };
};

export const isNormalized = (rgb: RGB): rgb is RGBColorNormalized => {
  return rgb.kind === "normalized";
};

export const isDenormalized = (rgb: RGB): rgb is RGBColor => {
  return rgb.kind === "denormalized";
};

export const formatRGBString = (rgb: RGB): string => {
  const { red, green, blue } = isDenormalized(rgb) ? normalizeRGB(rgb) : rgb;
  const toHexString = (n: number): string => {
    const n_prime = Math.round(n * 255).toString(16);
    return n_prime.length === 2 ? n_prime : "0" + n_prime;
  };

  return `#${toHexString(red)}${toHexString(green)}${toHexString(blue)}`;
};
