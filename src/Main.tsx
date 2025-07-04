import { createRoot } from "react-dom/client";

import "./main.css";

// import App from "./App";
import App2 from "./App2";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(<App2 />);
}
