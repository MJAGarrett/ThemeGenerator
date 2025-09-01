import { createContext } from "react";

export type ColorThemeMode = "light" | "dark" | "dim";
export interface ColorModeContext {
  mode: ColorThemeMode;
  setMode: (mode: ColorThemeMode) => void;
}

const themeModeContext = createContext<ColorModeContext>({
  mode: "light",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setMode: () => {},
});

export default themeModeContext;
