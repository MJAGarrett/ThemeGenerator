import { clamp } from "../utils/math_utils";
import { CircleDegree, makeCircleDegree, makeNormalized, makeNumber0To100, Normalized, Number0To100 } from "../utils/number_types";

/**
 * An object containing the three values for HSL with no ranges defined for each value.
 * Intended to be used as an intermediate/quick form between parsing.
 */
export interface HSLColor {
  readonly kind: "denormalized";
  readonly hue: number;
  readonly saturation: Number0To100;
  readonly lightness: Number0To100;
}

/**
 * An object containing the three values for HSL with hue in the range [0, 360],
 * saturation and lightness in the range [0, 1].
 */
export interface HSLColorNormalized {
  readonly kind: "normalized";
  readonly hue: CircleDegree;
  readonly saturation: Normalized;
  readonly lightness: Normalized;
}

export type HSL = HSLColor | HSLColorNormalized;

export const isNormalized = (hsl: HSL): hsl is HSLColorNormalized => {
  return hsl.kind === "normalized";
};

export const isDenormalized = (hsl: HSL): hsl is HSLColor => {
  return hsl.kind === "denormalized";
};

/**
 * Creates an HSL color. Throws if either sat or light are not in the
 * range [0, 100], inclusive
 * @param hue Any real number
 * @param sat A real number in the range [0, 100]
 * @param light A real number in the range [0, 100]
 * @returns An HSLColor.
 */
export const makeHSLColor = (hue: number, sat: number, light: number): HSLColor => {
  return {
    kind: "denormalized",
    hue,
    saturation: makeNumber0To100(sat),
    lightness: makeNumber0To100(light),
  };
};

/**
 * Creates a normalized HSL color. Throws if either sat or light are not in the
 * range [0, 1], inclusive or if hue is not in the range [0, 360]
 * @param hue A real number in the range [0, 360]
 * @param sat A real number in the range [0, 1]
 * @param light A real number in the range [0, 1]
 * @returns A normalized HSLColor.
 */
export const makeHSLColorNormalized =
  (hue: number, sat: number, light: number): HSLColorNormalized => {
    return {
      kind: "normalized",
      hue: makeCircleDegree(hue),
      saturation: makeNormalized(sat),
      lightness: makeNormalized(light),
    };
  };

export const normalizeHSL =
  ({ hue, saturation, lightness }: HSLColor): HSLColorNormalized => {
    const h = hue % 360 + (hue < 0 ? 360 : 0);
    const s = clamp(saturation, 0, 100) * 0.01;
    const l = clamp(lightness, 0, 100) * 0.01;

    return {
      kind: "normalized",
      hue: makeCircleDegree(h),
      saturation: makeNormalized(s),
      lightness: makeNormalized(l),
    };
  };

export const denormalizeHSL =
  ({ hue, saturation, lightness }: HSLColorNormalized): HSLColor => {
    return {
      kind: "denormalized",
      hue,
      saturation: makeNumber0To100(saturation * 100),
      lightness: makeNumber0To100(lightness * 100),
    };
  };

export const formatHSLString = (color: HSL, precision = 2): string => {
  const { hue, saturation, lightness } =
    isDenormalized(color) ? normalizeHSL(color) : color;

  precision = Math.round(clamp(precision, 0, Number.MAX_SAFE_INTEGER));

  const s = (saturation * 100).toFixed(precision);
  const l = (lightness * 100).toFixed(precision);
  const h = hue.toFixed(precision);

  return `hsl(${h}, ${s}%, ${l}%)`;
};
