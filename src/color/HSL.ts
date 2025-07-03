import { clamp } from "../utils/math_utils";

/**
 * An object containing the three values for HSL with no ranges defined for each value.
 * Intended to be used as an intermediate/quick form between parsing.
 */
export interface HSLColor {
  readonly kind: "denormalized";
  readonly hue: number;
  readonly saturation: number;
  readonly lightness: number;
}

/**
 * An object containing the three values for HSL with hue in the range [0, 360],
 * saturation and lightness in the range [0, 1].
 */
export interface HSLColorNormalized {
  readonly kind: "normalized";
  readonly hue: number;
  readonly saturation: number;
  readonly lightness: number;
}

export type HSL = HSLColor | HSLColorNormalized;

export const isNormalized = (hsl: HSL): hsl is HSLColorNormalized => {
  return hsl.kind === "normalized";
};

export const isDenormalized = (hsl: HSL): hsl is HSLColor => {
  return hsl.kind === "denormalized";
};

export const normalizeHSL =
  ({ hue, saturation, lightness }: HSLColor): HSLColorNormalized => {
    const h = hue % 360 + (hue < 0 ? 360 : 0);
    const s = clamp(saturation, 0, 100) * 0.01;
    const l = clamp(lightness, 0, 100) * 0.01;

    return {
      kind: "normalized",
      hue: h,
      saturation: s,
      lightness: l,
    };
  };

export const formatHSLString = (color: HSL, precision: number = 2): string => {
  const { hue, saturation, lightness } =
    isDenormalized(color) ? normalizeHSL(color) : color;

  precision = Math.round(clamp(precision, 0, Number.MAX_SAFE_INTEGER));

  const s = (saturation * 100).toFixed(precision);
  const l = (lightness * 100).toFixed(precision);
  const h = hue.toFixed(precision);

  return `hsl(${h}, ${s}%, ${l}%)`;
};
