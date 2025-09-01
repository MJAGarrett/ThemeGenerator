import { useContext, useState } from "react";
import { denormalizeHSL, HSLColor, normalizeHSL } from "./color/HSL";
import HSLInputBar from "./Components/HSLParsingInputBar";
import RGBInputBar from "./Components/RGBParsingInputBar";
import { ParsingInputElement } from "./Components/ParsingInputElement";
import rgbParser from "./parsers/RGBParser";
import { extract, isSome, map } from "./Monads/Optional";
import { HSLToRGB, RGBToHSL } from "./color/Conversions";
import { denormalizeRGB, formatRGBString, normalizeRGB } from "./color/RGB";
import ColorVisualizer from "./Components/ColorVisualizer";
import lightModeGenerator from "./ThemeGeneration/LightModeGenerator";
import darkModeGenerator from "./ThemeGeneration/DarkModeGenerator";
import dimModeGenerator from "./ThemeGeneration/DimModeGenerator";
import { themeToCSSFileString } from "./ThemeGeneration/ThemeGeneration";
import ExampleSite from "./Components/ExampleSite";

import "./Selector.css";
import appContext from "./Contexts/AppContext";

const strategies = new Map([
  [ "rgb", RGBInputBar ],
  [ "hsl", HSLInputBar ],
]);


const Selector = () => {
  const [ Strategy, setStrategy ] = useState<ParsingInputElement>(() => RGBInputBar);
  const options = [ ...strategies.keys() ];
  const { setMode, color, setColor } = useContext(appContext);

  const onSelection = (str: string): void => {
    const nextStrat = strategies.get(str);
    if (!nextStrat) throw new Error("There was an error picking strategies");

    setStrategy(() => nextStrat);
  };

  const onParse = (color: HSLColor) => setColor(color);

  // TODO: Remove
  const test = () => {
    const light = lightModeGenerator(color);
    const dark = darkModeGenerator(color);
    const dim = dimModeGenerator(color);

    const fileName = "color-scheme.css";
    const binary = new Blob([ themeToCSSFileString(light, dark, dim) ], { type: "text/css" });
    const link = document.createElement("a");

    link.href = URL.createObjectURL(binary);
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(link.href);
  };

  return (
    <div className="theme-generator">
      <div
        className="colorSelection"
      >
        <div>
          <label htmlFor="strat">{"Type: "}
            <select
              onChange={ (e) => onSelection(e.target.value) }
              id="strat" name="strat"
            >
              { options.map((opt) => <option key={ opt } value={ opt }>{opt}</option>) }
            </select>
          </label>
          <Strategy onParse={ onParse } />
          <input
            type="color"
            value={ formatRGBString(denormalizeRGB(HSLToRGB(normalizeHSL(color)))) }
            onChange={ (e) => {
              const color = map(rgbParser(e.target.value),
                (c) => denormalizeHSL(RGBToHSL(normalizeRGB(c))));
              if (isSome(color)) onParse(extract(color));
            } }
          />
          <button onClick={ test } >Download CSS</button>
        </div>
        <div className="visualizers">
          <h3>Light Mode</h3>
          <ColorVisualizer theme={ lightModeGenerator(color) } />
          <button onClick={ () => setMode("light") }>Set as Theme</button>
          <h3>Dark Mode</h3>
          <ColorVisualizer theme={ darkModeGenerator(color) } />
          <button onClick={ () => setMode("dark") }>Set as Theme</button>
          <h3>Dim Mode</h3>
          <ColorVisualizer theme={ dimModeGenerator(color) } />
          <button onClick={ () => setMode("dim") }>Set as Theme</button>
        </div>
      </div>
      <ExampleSite />
    </div>
  );
};

export default Selector;
