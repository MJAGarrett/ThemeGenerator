import { makeHSLColor } from "../color/HSL";
import { makeNumber0To100 } from "../utils/number_types";
import { ThemeGenerator } from "./ThemeGeneration";

const dimModeGenerator: ThemeGenerator =
({ hue, saturation, lightness }) => {

  return {
    brand: makeHSLColor(hue, saturation / 1.25, lightness / 1.25),
    text1: makeHSLColor(hue, 15, 75),
    text2: makeHSLColor(hue, 10, 61),
    surface1: makeHSLColor(hue, 10, 20),
    surface2: makeHSLColor(hue, 10, 25),
    surface3: makeHSLColor(hue, 5, 30),
    surface4: makeHSLColor(hue, 5, 35),
    shadows: {
      surface_shadow: makeHSLColor(hue, 30, 13),
      shadow_strength: makeNumber0To100(0.2),
    },
  };
};

export default dimModeGenerator;
