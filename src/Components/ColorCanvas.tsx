import { useEffect, useRef } from "react";
import { formatHSLString, HSLColor } from "../color/HSL";

import "./ColorCanvas.css";

export interface ColorCanvasProps {
  color: HSLColor;
  width: number;
  height: number;
  style?: React.CSSProperties;
}

const ColorCanvas = (props: ColorCanvasProps) => {
  const { width, height, color } = props;
  const style = props.style ?? {};
  style.width = width;
  style.height = height;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = formatHSLString(color);
    ctx.fillRect(0, 0, width, height);
  }, [ width, height, color ]);

  return (
    <canvas
      className="colorCanvas"
      style={ style }
      ref={ canvasRef }
      width={ width }
      height={ height }
    >
    </canvas>);
};

export default ColorCanvas;
