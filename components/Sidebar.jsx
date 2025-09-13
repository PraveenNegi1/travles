"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, List, LogOut, Sparkles, Menu, X } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    {
      name: "Leads",
      href: "/dashboard/leads",
      icon: <List className="w-5 h-5" />,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart2 className="w-5 h-5" />,
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-100 dark:bg-gray-800 shadow-md"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Sidebar */}
      <AnimatePresence>
        {(isOpen || typeof window !== "undefined") && (
          <motion.aside
            initial={{ x: -260 }}
            animate={{ x: 0 }}
            exit={{ x: -260 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="w-64 fixed top-0 left-0 h-screen font-serif bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-700 p-6 flex flex-col sm:translate-x-0 z-40"
          >
            {/* Logo / Brand */}
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
                <Sparkles className="w-5 h-5 text-gray-700 dark:text-gray-200" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Dashboard
              </h2>
            </div>

            {/* Navigation */}
            <nav className="space-y-2">
              {navItems.map(({ name, href, icon }) => {
                const isActive = pathname === href;
                return (
                  <Link key={name} href={href}>
                    <motion.div
                      whileHover={{ x: 4 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors 
              ${
                isActive
                  ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-medium"
                  : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
                    >
                      {icon}
                      <span>{name}</span>
                    </motion.div>
                  </Link>
                );
              })}
            </nav>

            {/* Logout Button */}
            <motion.button
              onClick={handleLogout}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="mt-auto flex items-center gap-3 px-4 py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.button>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
