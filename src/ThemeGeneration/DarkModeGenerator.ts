import { makeHSLColor } from "../color/HSL";
import { makeNumber0To100 } from "../utils/number_types";
import { ThemeGenerator } from "./ThemeGeneration";

const darkModeGenerator: ThemeGenerator =
({ hue, saturation, lightness }) => {

  return {
    brand: makeHSLColor(hue, saturation / 2, lightness / 1.5),
    text1: makeHSLColor(hue, 15, 85),
    text2: makeHSLColor(hue, 5, 65),
    surface1: makeHSLColor(hue, 10, 10),
    surface2: makeHSLColor(hue, 10, 15),
    surface3: makeHSLColor(hue, 5, 20),
    surface4: makeHSLColor(hue, 5, 25),
    shadows: {
      surface_shadow: makeHSLColor(hue, 50, 3),
      shadow_strength: makeNumber0To100(0.8),
    },
  };
};

export default darkModeGenerator;
