import { createContext } from "react";
import { HSLColor, makeHSLColor } from "../color/HSL";
import { ColorModeContext } from "./ColorThemeContext";

export type AppContext = ColorModeContext & {
  color: HSLColor,
  setColor: (color: HSLColor) => void,
};

const appContext = createContext<AppContext>({
  color: makeHSLColor(0, 0, 100),
  mode: "light",
  // Intentionally set the below functions to do nothing
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setColor: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMode: () => {},
});

export default appContext;
