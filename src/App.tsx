import React, { useState } from "react";

import "./App.css";
import { formatRGBString, normalizeRGB } from "./color/RGB.ts";
import rgbParser from "./parsers/RGBParser.ts";
import hslParser from "./parsers/HSLParser.ts";
import { formatHSLString, normalizeHSL } from "./color/HSL.ts";
import { HSLToRGB, RGBToHSL } from "./color/Conversions.ts";

const App = () => {
  const [ RGBString, setRGBString ] = useState("");
  const [ HSLString, setHSLString ] = useState("");
  const [ RGBBackgroundColor, setRGBBackgroundColor ] = useState("#ffffff");
  const [ HSLBackgroundColor, setHSLBackgroundColor ] = useState("hsl(0, 0, 100%)");

  const onRGBChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRGBString(e.target.value);
    const rgb = rgbParser(e.target.value);

    if (!rgb) return;

    setRGBBackgroundColor(formatRGBString(rgb));

    const hsl = RGBToHSL(normalizeRGB(rgb));
    const hslString = formatHSLString(hsl);
    setHSLString(hslString);
    setHSLBackgroundColor(hslString);
  };

  const onHSLChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHSLString(e.target.value);
    const hsl = hslParser(e.target.value);

    if (!hsl) return;
    setHSLBackgroundColor(formatHSLString(hsl));

    const rgb = HSLToRGB(normalizeHSL(hsl));
    const rgbString = formatRGBString(rgb);
    setRGBString(rgbString);
    setRGBBackgroundColor(rgbString);
  };

  return (
    <main className="main">

      <div className="rgb-entry">
        <label htmlFor="rgbInput">{"RGB: "}</label>
        <input
          onChange={ onRGBChange }
          type="text" name="rgb" id="rgbInput" maxLength={ 7 }
          value={ RGBString }
          pattern="#([0-9A-Fa-f]{3,3}|[0-9A-Fa-f]{6,6})"
        />
        <div style={{ backgroundColor: RGBBackgroundColor }} className="display-box-rgb"></div>
      </div>

      <div className="hsl-entry">
        <label htmlFor="hslInput">{"HSL: "}</label>
        <input
          onChange={ onHSLChange }
          type="text" name="hsl" id="hslInput" value={ HSLString }
        />
        <div style={{ backgroundColor: HSLBackgroundColor }} className="display-box-hsl"></div>
        <input value={ RGBBackgroundColor } onChange={ onRGBChange } type="color" name="hslColor" id="hslColor" />
      </div>

    </main>
  );
};

export default App;
