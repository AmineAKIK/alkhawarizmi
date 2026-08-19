import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { registerSW } from "virtual:pwa-register";
import { App } from "./ui/App";
import "./styles/global.css";

if (import.meta.env.PROD) {
  registerSW({ immediate: true });
}

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element "#root" not found in index.html — cannot mount the app.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
