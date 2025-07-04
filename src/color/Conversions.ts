import { HSLColorNormalized, makeHSLColorNormalized } from "./HSL";
import { makeRGBColorNormalized, RGBColorNormalized } from "./RGB";

export function RGBToHSL(rgb: RGBColorNormalized): HSLColorNormalized {
  const {
    red,
    green,
    blue,
  } = rgb;

  const cmax = Math.max(red, green, blue);
  const cmin = Math.min(red, green, blue);
  const chroma = cmax - cmin;

  let hue = 0;
  if (chroma !== 0) {
    if (cmax === red) {
      hue = (green - blue) / chroma % 6;
    }
    else if (cmax === green) {
      hue = (blue - red) / chroma + 2;
    }
    else if (cmax === blue) {
      hue = (red - green) / chroma + 4;
    }
  }

  hue *= 60;
  if (hue < 0) hue += 360;

  const lightness = (cmax + cmin) / 2;
  const saturation = chroma === 0 ? 0 : chroma / (1 - Math.abs(2 * lightness - 1));

  return makeHSLColorNormalized(hue, saturation, lightness);
}

export function HSLToRGB({ hue, saturation, lightness }: HSLColorNormalized): RGBColorNormalized {
  const H = hue;
  const S = saturation;
  const L = lightness;

  const chroma = (1 - Math.abs(2 * L - 1)) * S;

  const H_prime = H / 60;
  const X = chroma * (1 - Math.abs(H_prime % 2 - 1));
  let rgb = { red: 0, green: 0, blue: 0 };

  if (H_prime < 1) {
    rgb = { red: chroma, green: X, blue: 0 };
  }
  else if (H_prime < 2) {
    rgb = { red: X, green: chroma, blue: 0 };
  }
  else if (H_prime < 3) {
    rgb = { red: 0, green: chroma, blue: X };
  }
  else if (H_prime < 4) {
    rgb = { red: 0, green: X, blue: chroma };
  }
  else if (H_prime < 5) {
    rgb = { red: X, green: 0, blue: chroma };
  }
  else if (H_prime < 6) {
    rgb = { red: chroma, green: 0, blue: X };
  }

  const m = L - chroma / 2;
  const { red, green, blue } = rgb;

  return makeRGBColorNormalized(red + m, green + m, blue + m);
}
