import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import './joy.css';
import JoyShowcase from "@/components/joy-showcase";

document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JoyShowcase/>
  </StrictMode>,
);
