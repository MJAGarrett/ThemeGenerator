import { ChangeEvent, useEffect, useRef, useState } from "react";
import { HSLColor } from "../color/HSL";
import { ParsingInputElementProps } from "./ParsingInputElement";
import { extract, isSome, Optional } from "../Monads/Optional";

export interface ParsingTextBarProps extends ParsingInputElementProps {
  parseFunc: (str: string) => Optional<HSLColor>;
  initialInput: string;
}

const ParsingTextBar = ({ onParse, parseFunc, initialInput }: ParsingTextBarProps) => {
  const [ input, setInput ] = useState(initialInput);
  const isTyping = useRef(false);
  const typingTimeout = useRef<NodeJS.Timeout>(setTimeout(() => isTyping.current = false, 10));

  useEffect(() => {
    if (!isTyping.current)
      setInput(initialInput);
  }, [ initialInput ]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    isTyping.current = true;
    const input = e.target.value;
    setInput(input);

    const parsed = parseFunc(input);
    if(isSome(parsed)) {
      onParse(extract(parsed));
    }

    typingTimeout.current.refresh();
  };

  return (
    <input
      value={ input }
      onChange={ onChange }
      type="text"
    />
  );
};

export default ParsingTextBar;
