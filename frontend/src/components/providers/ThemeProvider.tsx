import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
   const mode = useThemeStore((state) => state.mode);

   useEffect(() => {
      const root = document.documentElement;

      if (mode === "dark") {
         root.classList.add("dark");
      } else {
         root.classList.remove("dark");
      }
   }, [mode]);

   return children;
};

export default ThemeProvider;
