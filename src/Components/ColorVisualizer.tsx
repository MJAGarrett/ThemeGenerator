import { HSLColor } from "../color/HSL";
import { Theme } from "../ThemeGeneration/ThemeGeneration";
import ColorCanvas from "./ColorCanvas";

import "./ColorVisualizer.css";

export interface ColorVisualizerProps { theme: Theme; }

const ColorCircle = ({ color }: { color: HSLColor }) => {
  return (
    <>
      <ColorCanvas color={ color } width={ 50 } height={ 50 } />
    </>
  );
};

const ColorVisualizer = (props: ColorVisualizerProps) => {
  const {
    brand,
    text1,
    text2,
    surface1,
    surface2,
    surface3,
    surface4,
  } = props.theme;

  const colors = [
    brand,
    text1,
    text2,
    surface1,
    surface2,
    surface3,
    surface4,
  ];

  return (
    <div
      className="colorVisualizer"
    >
      {colors.map((color, idx) => {
        return <ColorCircle color={ color } key={ idx } />;
      })}
    </div>
  );
};

export default ColorVisualizer;
