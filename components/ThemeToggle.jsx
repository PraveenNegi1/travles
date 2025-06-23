"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
    >
      {theme === "dark" ? <Sun className="text-yellow-400" /> : <Moon className="text-blue-600" />}
    </button>
  );
}