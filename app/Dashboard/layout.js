// app/dashboard/layout.js
"use client";
import { ThemeProvider } from "@/context/ThemeContext";
import ThemeToggle from "@/components/ThemeToggle";
import Sidebar from "@/components/Sidebar"; 

export default function dashboardLayout({ children }) {
  return (
    <ThemeProvider>
      <div className="flex min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Sidebar />
        <main className="flex-1 p-4 sm:p-6">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          {children}
           
        </main>
      </div>
    </ThemeProvider>
  );
}