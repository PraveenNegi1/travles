"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart2, List } from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();

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

  return (
    <aside className="w-60 h-screen bg-white dark:bg-gray-900 shadow-lg border-r border-gray-200 dark:border-gray-700 p-4 hidden sm:block transition-colors">
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
    </aside>
  );
};

export default Sidebar;
