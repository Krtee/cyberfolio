import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
gsap.registerPlugin(useGSAP);

document.addEventListener("readystatechange", function () {
  if (document.readyState === "complete") {
    // good luck!
    console.log("React app DOM is fully loaded.");
  }
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
