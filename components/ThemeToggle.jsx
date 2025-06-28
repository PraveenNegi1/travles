"use client";
import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-yellow-500"
      >
        {theme === "dark" ? (
          <Sun className="text-yellow-400 w-5 h-5" />
        ) : (
          <Moon className="text-blue-600 w-5 h-5" />
        )}
      </button>
    </div>
  );
}
