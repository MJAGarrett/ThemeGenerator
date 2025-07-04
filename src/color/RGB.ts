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

export interface RGBColorNormalized {
  kind: "normalized";
  readonly red: Normalized;
  readonly green: Normalized;
  readonly blue: Normalized;
}

type RGB = RGBColor | RGBColorNormalized;


export const makeRGBColor = (red: number, green: number, blue: number): RGBColor => {
  return {
    kind: "denormalized",
    red: makeByte(red),
    green: makeByte(green),
    blue: makeByte(blue),
  };
};

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
