import { useEffect, useRef, useState } from "react";
import { formatRGBString, normalizeRGB } from "./color/RGB";
import rgbParser from "./parsers/RGBParser";
import hslParser from "./parsers/HSLParser";
import { HSLToRGB, RGBToHSL } from "./color/Conversions";
import { formatHSLString, normalizeHSL } from "./color/HSL";

type Strategy = (string: string) => string;

const RGBStrategy: Strategy = (str) => {
  const res = rgbParser(str);
  if (!res) return "";
  else return formatRGBString(normalizeRGB(res));
};

const HSLStrategy: Strategy = (str) => {
  const res = hslParser(str);
  if (!res) return "";
  else return formatHSLString(normalizeHSL(res));
};

const ColorCanvas = (props: { color: string, width: number, height: number }) => {
  const { color, width, height } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, width, height);
  }, [ color, width, height ]);

  return <canvas
    style={{ border: "2px solid black" }}
    ref={canvasRef}
    width={width}
    height={height}></canvas>;
};

const App2 = () => {
  const [ strategy, setStrategy ] = useState<Strategy>(() => RGBStrategy);
  const options: ["rgb", "hsl"] = [ "rgb", "hsl" ];
  const [ input, setInput ] = useState("#fff");
  const [ backgroundColor, setbackgroundColor ] = useState("white");

  const onSelection = (selection: "rgb" | "hsl"): void => {
    if (selection === "rgb") {
      setStrategy(() => RGBStrategy);
      const hsl = hslParser(input);
      if (hsl) setInput(formatRGBString(HSLToRGB(normalizeHSL(hsl))));
      else setInput("#");
    }
    else if (selection === "hsl") {
      setStrategy(() => HSLStrategy);
      const rgb = rgbParser(input);
      if (rgb) setInput(formatHSLString(RGBToHSL(normalizeRGB(rgb))));
      else setInput("hsl()");
    }
  };

  const onInput = (str: string) => {
    setInput(str);
    setbackgroundColor(strategy(str));
  };

  return (
    <div
      style={{
        display: "flex",
        lineHeight: "1.5",
        alignItems: "start",
        gap: "1em",
      }}
      className="color input">
      <label htmlFor="strat">Type: </label>
      <select
        onChange={(e) => onSelection(e.target.value as "rgb" | "hsl")}
        id="strat" name="strat">
        { options.map((opt) => <option key={opt} value={opt}>{opt}</option>) }
      </select>
      <input
        value={input}
        onChange={(e) => onInput(e.target.value)}
        type="text" name="colorInput" id="colorInput" />
      <ColorCanvas color={backgroundColor} width={50} height={50} />
    </div>
  );

};

export default App2;
