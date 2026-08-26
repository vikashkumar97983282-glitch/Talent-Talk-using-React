import { useEffect, useState } from "react";
import { AdminThemeContext } from "./adminThemeContext";

export function AdminThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem("admin-theme") || "dark");

  useEffect(() => {
    localStorage.setItem("admin-theme", theme);
    document.body.dataset.adminTheme = theme;
  }, [theme]);

  const toggleTheme = () => setTheme((currentTheme) => currentTheme === "dark" ? "light" : "dark");

  return <AdminThemeContext.Provider value={{ theme, toggleTheme }}>{children}</AdminThemeContext.Provider>;
}

