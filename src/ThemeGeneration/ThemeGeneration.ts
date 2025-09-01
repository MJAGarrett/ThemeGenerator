import { formatHSLString, HSLColor } from "../color/HSL";
import { Number0To100 } from "../utils/number_types";

export interface Theme {
  brand: HSLColor,
  text1: HSLColor,
  text2: HSLColor,
  surface1: HSLColor,
  surface2: HSLColor,
  surface3: HSLColor,
  surface4: HSLColor,
  shadows: {
    surface_shadow: HSLColor,
    shadow_strength: Number0To100,
  },
}

export type ThemeGenerator = (color: HSLColor) => Theme;

const themeToCSSVariablesString = (theme: Theme, suffix = ""): string => {
  const { shadow_strength, surface_shadow } = theme.shadows;
  const lines: string[] = [ ];
  if (suffix !== "") suffix = "-" + suffix;

  (Object.keys(theme) as (keyof Theme)[])
    .filter((key) => key !== "shadows")
    .forEach((key) => lines.push(`--${key + suffix}: ${formatHSLString(theme[key])};`));

  const { hue, saturation, lightness } = surface_shadow;
  // Shadow string has to be the components of hsl, but not an hsl function itself
  // to work.
  const shadowString = `${hue} ${saturation}% ${lightness}%`;
  lines.push(`--shadow-strength${suffix}: ${shadow_strength.toFixed(2)};`);
  lines.push(`--surface-shadow${suffix}: ${shadowString};`);

  return lines.join("\n");
};

const createSchemeRule = (lightMode: "light" | "dim" | "dark"): string => {
  const scheme = lightMode === "dim" ? "dark" : lightMode;
  const lines = [ `[color-scheme="${lightMode}"] {`, `color-scheme: ${scheme};` ];

  const createRule = (name: string) => `--${name}: var(--${name}-${lightMode});`;

  [
    "brand",
    "text1",
    "text2",
    "surface1",
    "surface2",
    "surface3",
    "surface4",
    "surface-shadow",
    "shadow-strength",
  ].forEach((name) => lines.push(createRule(name)));

  lines.push("}");

  return lines.join("\n");
};

const createAllSchemeRules = (): string => {
  return ([ "light", "dark", "dim" ] as ("light" | "dark" | "dim")[])
    .map(createSchemeRule).join("\n\n");
};

export const themeToCSSFileString = (light: Theme, dark: Theme, dim: Theme): string => {
  const lightVars = themeToCSSVariablesString(light, "light");
  const darkVars = themeToCSSVariablesString(dark, "dark");
  const dimVars = themeToCSSVariablesString(dim, "dim");

  const combined = [
    ":root {",
    lightVars,
    "",
    darkVars,
    "",
    dimVars,
    "}",
    "",
    createAllSchemeRules(),
    "",
    radShadow,
  ].join("\n");

  return combined;
};

const radShadow =
`.rad-shadow {
  box-shadow:
    0 2.8px 2.2px hsl(var(--surface-shadow) / calc(var(--shadow-strength) + .03)),
    0 6.7px 5.3px hsl(var(--surface-shadow) / calc(var(--shadow-strength) + .01)),
    0 12.5px 10px hsl(var(--surface-shadow) / calc(var(--shadow-strength) + .02)),
    0 22.3px 17.9px hsl(var(--surface-shadow) / calc(var(--shadow-strength) + .02)),
    0 41.8px 33.4px hsl(var(--surface-shadow) / calc(var(--shadow-strength) + .03)),
    0 100px 80px hsl(var(--surface-shadow) / var(--shadow-strength));
}`;
