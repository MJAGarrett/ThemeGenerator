import { ParsingInputElement } from "./ParsingInputElement";
import rgbParser from "../parsers/RGBParser";
import { map, Optional } from "../Monads/Optional";
import { HSLToRGB, RGBToHSL } from "../color/Conversions";
import { denormalizeHSL, HSLColor, normalizeHSL } from "../color/HSL";
import { formatRGBString, normalizeRGB } from "../color/RGB";
import ParsingTextBar from "./ParsingTextBar";
import { useContext } from "react";
import appContext from "../Contexts/AppContext";

const RGBInputBar: ParsingInputElement = ({ onParse }) => {
  const { color } = useContext(appContext);

  const parseFunc = (str: string): Optional<HSLColor> => {
    return map(rgbParser(str), (color) => {
      return denormalizeHSL(RGBToHSL(normalizeRGB(color)));
    });
  };

  const initialInput = formatRGBString(HSLToRGB(normalizeHSL(color)));

  return <ParsingTextBar { ...{ onParse, parseFunc, initialInput } } />;
};

export default RGBInputBar;
