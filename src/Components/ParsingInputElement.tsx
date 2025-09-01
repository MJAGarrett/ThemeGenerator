import { HSLColor } from "../color/HSL";

export interface ParsingInputElementProps { onParse: (color: HSLColor) => void }

/**
 * A ParsingInputElement is any element which can provide an HSLColor.
 *
 * This was envisioned to be a general interface for textual input bars but can really
 * be any component that provides a color based on user interaction.
 */
export type ParsingInputElement = React.FC<ParsingInputElementProps>;
