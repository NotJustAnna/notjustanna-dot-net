import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './tailwind.css';
import './index.css';
import { MainPage } from "@/components/main-page";
import { Footer } from "@/components/main-page/footer.tsx";

document.documentElement.classList.toggle(
  "dark",
  localStorage.theme === "dark" ||
  (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MainPage/>
    <Footer/>
  </StrictMode>,
);
