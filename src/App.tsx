import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Selector from "./Selector";
import Navbar, { NavItemPair } from "./Components/Navbar";
import { ColorThemeMode } from "./Contexts/ColorThemeContext";
import TestSite from "./TestSite";
import { HSLColor, makeHSLColor } from "./color/HSL";
import darkModeGenerator from "./ThemeGeneration/DarkModeGenerator";
import dimModeGenerator from "./ThemeGeneration/DimModeGenerator";
import lightModeGenerator from "./ThemeGeneration/LightModeGenerator";
import { themeToCSSFileString } from "./ThemeGeneration/ThemeGeneration";
import AppContext from "./Contexts/AppContext";

import "./App.css";

const navItems: NavItemPair[] = [
  [ "Picker", "/" ],
  [ "Example", "/test" ],
];

const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

const createStyleSheetFromColor = (color: HSLColor): CSSStyleSheet => {
  const lightTheme = lightModeGenerator(color);
  const darkTheme = darkModeGenerator(color);
  const dimTheme = dimModeGenerator(color);

  const cssStyleSheet = new CSSStyleSheet();
  cssStyleSheet.replaceSync(themeToCSSFileString(lightTheme, darkTheme, dimTheme));

  return cssStyleSheet;
};

const App = () => {
  const [ colorMode, setColorMode ] = useState<ColorThemeMode>(prefersDarkMode ? "dark" : "light");
  const [ color, setColor ] = useState(makeHSLColor(0, 0, 100));

  useEffect(() => {
    const styleSheet = createStyleSheetFromColor(color);
    styleSheet.insertRule(".surface1 { background-color: var(--surface1); color: var(--text2); }");
    styleSheet.insertRule(".surface2 { background-color: var(--surface2); color: var(--text2); }");
    styleSheet.insertRule(".surface3 { background-color: var(--surface3); color: var(--text1); }");
    styleSheet.insertRule(".surface4 { background-color: var(--surface4); color: var(--text1); }");

    document.adoptedStyleSheets = [ styleSheet ];
  }, [ color ]);

  useEffect(() => {
    document.documentElement.setAttribute("color-scheme", colorMode);
  }, [ colorMode ]);

  const appContextValue = {
    color,
    mode: colorMode,
    setColor,
    setMode: setColorMode,
  };

  return (
    <AppContext value={ appContextValue } >
      <BrowserRouter>
        <Navbar items={ navItems } />
        <Routes>
          <Route path="/" element={ <Selector /> } />
          <Route path="/test" element={ <TestSite /> } />
        </Routes>
      </BrowserRouter>
    </AppContext>
  );
};
export default App;
