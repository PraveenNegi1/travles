"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart2, List, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { motion } from "framer-motion";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      name: "Leads",
      href: "/Dashboard/leads",
      icon: <List className="w-5 h-5" />,
    },
    {
      name: "Analytics",
      href: "/Dashboard/analytics",
      icon: <BarChart2 className="w-5 h-5" />,
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    // Force full page reload for clean state
    window.location.href = "/login";
  };

  return (
    <aside className="w-60 font-serif  fixed top-0  h-screen bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-700 p-4 hidden sm:flex flex-col justify-between transition-colors">
      <div>
        <h2 className="text-xl font-bold text-blue-700 dark:text-yellow-300 mb-6">
          Dashboard
        </h2>

        <nav className="space-y-2">
          {navItems.map(({ name, href, icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={name}
                href={href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition 
                  ${
                    isActive
                      ? "bg-blue-100 dark:bg-blue-800 text-blue-900 dark:text-white font-semibold"
                      : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
              >
                {icon}
                <span>{name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout Button */}
      <motion.button
        onClick={handleLogout}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{
          scale: 1.08,
          y: -2,
          boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.2)",
        }}
        whileTap={{ scale: 0.95, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="flex items-center gap-3 px-5 py-2.5 mt-4 rounded-xl text-white bg-red-800 dark:text-white hover:bg-red-700 dark:hover:bg-red-800 transition-all duration-300 shadow-md"
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </motion.button>
    </aside>
  );
};

export default Sidebar;
