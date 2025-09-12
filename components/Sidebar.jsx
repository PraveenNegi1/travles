"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart2, List, LogOut, Sparkles, TrendingUp } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { motion } from "framer-motion";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const navItems = [
    {
      name: "Leads",
      href: "/dashboard/leads",
      icon: <List className="w-5 h-5" />,
      gradient: "from-emerald-400 to-cyan-400",
      hoverGradient: "from-emerald-500 to-cyan-500",
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart2 className="w-5 h-5" />,
      gradient: "from-violet-400 to-purple-400",
      hoverGradient: "from-violet-500 to-purple-500",
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/login";
  };

  return (
    <aside className="w-60 font-serif fixed top-0 h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 shadow-2xl border-r border-gray-200/50 dark:border-gray-700/50 p-6 hidden sm:flex flex-col justify-between transition-all duration-500 backdrop-blur-sm">
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-lg blur opacity-20"></div>
          <div className="relative bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200/50 dark:border-gray-700/50">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                dashboard
              </h2>
            </div>
          </div>
        </motion.div>

        <nav className="space-y-3">
          {navItems.map(
            ({ name, href, icon, gradient, hoverGradient }, index) => {
              const isActive = pathname === href;
              return (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                  className="relative"
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-xl opacity-20 blur-sm`}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                    />
                  )}

                  <Link href={href}>
                    <motion.div
                      whileHover={{
                        scale: 1.02,
                        y: -2,
                        boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      className={`relative flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group cursor-pointer
                      ${
                        isActive
                          ? `bg-gradient-to-r ${gradient} text-white shadow-lg border border-white/20`
                          : "text-gray-700 dark:text-gray-200 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:shadow-md border border-transparent hover:border-gray-200/50 dark:hover:border-gray-700/50"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg transition-all duration-300 
                      ${
                        isActive
                          ? "bg-white/20 backdrop-blur-sm"
                          : `group-hover:bg-gradient-to-r group-hover:${hoverGradient} group-hover:text-white bg-gray-100 dark:bg-gray-700`
                      }`}
                      >
                        {icon}
                      </div>

                      <span
                        className={`font-medium transition-all duration-300 
                      ${
                        isActive
                          ? "text-white"
                          : "group-hover:text-gray-900 dark:group-hover:text-white"
                      }`}
                      >
                        {name}
                      </span>

                      {isActive && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="ml-auto w-2 h-2 bg-white rounded-full shadow-md"
                        />
                      )}
                    </motion.div>
                  </Link>
                </motion.div>
              );
            }
          )}
        </nav>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative"
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl blur opacity-30"></div>
        <motion.button
          onClick={handleLogout}
          whileHover={{
            scale: 1.05,
            y: -3,
            boxShadow: "0 12px 30px rgba(239, 68, 68, 0.4)",
          }}
          whileTap={{ scale: 0.95, y: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="relative w-full flex items-center gap-4 px-6 py-4 rounded-xl text-white bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg border border-white/20 backdrop-blur-sm group"
        >
          <div className="p-2 bg-white/20 rounded-lg group-hover:bg-white/30 transition-all duration-300">
            <LogOut className="w-5 h-5" />
          </div>
          <span className="font-medium">Logout</span>

          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="ml-auto"
          >
            <TrendingUp className="w-4 h-4 opacity-60" />
          </motion.div>
        </motion.button>
      </motion.div>
    </aside>
  );
};

export default Sidebar;
