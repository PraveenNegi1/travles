"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Map,
  Compass,
  Mountain,
  Phone,
  Globe,
  Info,
} from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = () => setDropdownOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: <Globe size={16} strokeWidth={2.5} /> },
    {
      href: "/about",
      label: "About",
      icon: <Info size={16} strokeWidth={2.5} />,
    },
    {
      href: "/Destinations",
      label: "Destinations",
      icon: <Compass size={16} strokeWidth={2.5} />,
    },
    {
      href: "/HowToReech",
      label: "How To Reach",
      icon: <Map size={16} strokeWidth={2.5} />,
    },
    {
      href: "/uttarakhand",
      label: "Uttarakhand",
      icon: <Mountain size={16} strokeWidth={2.5} />,
    },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{
        y: hidden ? -100 : 0,
        opacity: 1,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={` w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#205781]/95 backdrop-blur-md py-2 shadow-lg"
          : "bg-gradient-to-r from-[#205781] to-[#1c4e75] py-3 md:py-4"
      }`}
    >
      <div className=" mx-auto px-4 py-2 sm:px-6 flex justify-between items-center overflow-hidden ">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
          className="flex items-center space-x-2"
        >
          <div className="bg-white text-[#205781] p-2 md:p-2 rounded-full shadow-md">
            <Map size={18} className="md:w-5 md:h-5" />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#FAF1E6] tracking-wide merriweather">
            Travels
          </h1>
        </motion.div>

        <div className="hidden md:flex items-center space-x-4 lg:space-x-6">
          <ul className="flex space-x-2 lg:space-x-4 merriweather">
            {navItems.map((item) => (
              <li key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`relative font-medium transition-all duration-300 px-3 py-2 rounded-full flex items-center gap-1.5 text-sm lg:text-base hover:scale-105 ${
                    pathname === item.href
                      ? "bg-white text-[#205781] shadow-md"
                      : "text-[#FAF1E6] hover:bg-[#FAF1E6]/10"
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {pathname === item.href && (
                    <motion.span
                      layoutId="navIndicator"
                      className="absolute inset-0 rounded-full bg-white -z-10"
                      transition={{ type: "spring", duration: 0.5 }}
                    />
                  )}
                </Link>

                <motion.span
                  className={`absolute -bottom-1 left-1/2 w-0 h-0.5 bg-white rounded-full transform -translate-x-1/2 transition-all duration-300 ${
                    pathname === item.href ? "hidden" : "group-hover:w-1/2"
                  }`}
                />
              </li>
            ))}
          </ul>

          <Link
            href="/Contect"
            className={`font-medium px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 text-sm lg:text-base hover:scale-105 ${
              pathname === "/Contect"
                ? "bg-white text-[#205781] shadow-md"
                : "bg-[#FAF1E6]/10 text-[#FAF1E6] hover:bg-[#FAF1E6]/20"
            }`}
          >
            <Phone size={16} strokeWidth={2.5} />
            Contact Us
          </Link>
        </div>

        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(!isOpen)}
            className="bg-[#FAF1E6]/10 hover:bg-[#FAF1E6]/20 text-white p-2 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#FAF1E6]/30"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-x-0 top-[57px] z-50 mt-4"
          >
            <div className="bg-gradient-to-b from-[#205781] to-[#1a496e] shadow-lg border-t border-[#FAF1E6]/10 rounded-b-xl mx-3">
              <motion.ul
                className="py-6 px-6 flex flex-col space-y-2.5 merriweather "
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.07,
                    },
                  },
                }}
                initial="hidden"
                animate="show"
              >
                {navItems.map((item) => (
                  <motion.li
                    key={item.href}
                    variants={{
                      hidden: { x: -20, opacity: 0 },
                      show: { x: 0, opacity: 1 },
                    }}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 text-base font-medium px-4 py-2.5 rounded-lg ${
                        pathname === item.href
                          ? "bg-white text-[#205781] shadow-md"
                          : "text-[#FAF1E6] hover:bg-[#FAF1E6]/10 active:bg-[#FAF1E6]/20"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  variants={{
                    hidden: { x: -20, opacity: 0 },
                    show: { x: 0, opacity: 1 },
                  }}
                  className="pt-2"
                >
                  <Link
                    href="/Contect"
                    className={`flex items-center gap-3 text-base font-medium px-4 py-2.5 rounded-lg ${
                      pathname === "/Contect"
                        ? "bg-white text-[#205781] shadow-md"
                        : "bg-[#FAF1E6]/10 text-[#FAF1E6] hover:bg-[#FAF1E6]/20 active:bg-[#FAF1E6]/30"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <Phone size={16} strokeWidth={2.5} />
                    Contact Us
                  </Link>
                </motion.li>
              </motion.ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
