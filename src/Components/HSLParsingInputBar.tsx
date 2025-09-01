import { ParsingInputElement } from "./ParsingInputElement";
import { Optional } from "../Monads/Optional";
import hslParser from "../parsers/HSLParser";
import { formatHSLString, HSLColor } from "../color/HSL";
import ParsingTextBar from "./ParsingTextBar";
import { useContext } from "react";
import appContext from "../Contexts/AppContext";

const HSLInputBar: ParsingInputElement = ({ onParse }) => {
  const { color } = useContext(appContext);
  const parseFunc = (str: string): Optional<HSLColor> => {
    return hslParser(str);
  };

  const initialInput = formatHSLString(color);

  return <ParsingTextBar { ...{ parseFunc, onParse, initialInput } } />;
};

export default HSLInputBar;
