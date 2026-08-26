import { useContext } from "react";
import { AdminThemeContext } from "./adminThemeContext";

export function useAdminTheme() {
  return useContext(AdminThemeContext) || { theme: "dark", toggleTheme: () => {} };
}
