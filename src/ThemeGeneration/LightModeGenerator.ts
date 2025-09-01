import { makeHSLColor } from "../color/HSL";
import { makeNumber0To100 } from "../utils/number_types";
import { ThemeGenerator } from "./ThemeGeneration";

const lightModeGenerator: ThemeGenerator = (brandColor) => {
  const { hue, saturation, lightness } = brandColor;

  return {
    brand: brandColor,
    text1: makeHSLColor(hue, saturation, 10),
    text2: makeHSLColor(hue, 30, 30),
    surface1: makeHSLColor(hue, 25, 90),
    surface2: makeHSLColor(hue, 20, 99),
    surface3: makeHSLColor(hue, 20, 92),
    surface4: makeHSLColor(hue, 20, 85),
    shadows: {
      surface_shadow: makeHSLColor(hue, 10, lightness / 5),
      shadow_strength: makeNumber0To100(0.02),
    },
  };
};

export default lightModeGenerator;
