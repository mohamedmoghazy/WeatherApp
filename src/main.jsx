import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import DailyForcast from "./DailyForcast.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/*<App /> */}
    <DailyForcast />
  </StrictMode>
);
