import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ThemeProvider from "./components/providers/ThemeProvider.tsx";

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <ThemeProvider>
         <BrowserRouter>
            <Routes>
               <Route
                  path="/*"
                  element={<App />}
               />
            </Routes>
         </BrowserRouter>
      </ThemeProvider>
   </StrictMode>,
);
