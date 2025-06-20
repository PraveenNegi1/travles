"use client";
import { useState, useEffect, useRef } from "react";
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
  const sidebarRef = useRef(null);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target) &&
        isOpen
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navItems = [
    { href: "/", label: "Home", icon: <Globe size={20} strokeWidth={2} /> },
    {
      href: "/about",
      label: "About",
      icon: <Info size={20} strokeWidth={2} />,
    },
    {
      href: "/Destinations",
      label: "Destinations",
      icon: <Compass size={20} strokeWidth={2} />,
    },
    {
      href: "/HowToReech",
      label: "How To Reach",
      icon: <Map size={20} strokeWidth={2} />,
    },
    {
      href: "/uttarakhand",
      label: "Uttarakhand",
      icon: <Mountain size={20} strokeWidth={2} />,
    },
    {
     href:"/contact",
      label: "Contact Us",
      icon: <Phone size={20} strokeWidth={2} />,
    },
  ];
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{
          y: hidden ? -100 : 0,
          opacity: 1,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#205781]/95 backdrop-blur-md py-2 shadow-lg"
            : "bg-gradient-to-r from-[#205781] to-[#1c4e75] py-3 md:py-4"
        }`}
      >
        <div className="mx-auto px-4 py-2 sm:px-6 flex justify-between items-center overflow-hidden">
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
              {navItems.slice(0, 5).map((item) => (
                <li key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`relative font-medium transition-all duration-300 px-3 py-2 rounded-full flex items-center gap-1.5 text-sm md:text-[18px] hover:scale-105 ${
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
              href="/contact"
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
      </motion.nav>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Sidebar - Now on the right side */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-64 z-50 md:hidden"
          >
            <div className="h-full bg-gradient-to-b from-[#205781] to-[#1a496e] shadow-xl flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-[#FAF1E6]/10">
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-[#FAF1E6]/10 text-white hover:bg-[#FAF1E6]/20"
                >
                  <X size={18} />
                </button>
                <div className="flex items-center space-x-2">
                  <div className="bg-white text-[#205781] p-1.5 rounded-full shadow-md">
                    <Map size={16} />
                  </div>
                  <h1 className="text-xl font-extrabold text-[#FAF1E6] tracking-wide merriweather">
                    Travels
                  </h1>
                </div>
              </div>

              <div className="overflow-y-auto flex-grow">
                <motion.ul
                  className="py-4 px-2 space-y-1 merriweather"
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
                        hidden: { x: 20, opacity: 0 },
                        show: { x: 0, opacity: 1 },
                      }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 text-base font-medium px-4 py-3 rounded-lg ${
                          pathname === item.href
                            ? "bg-white text-[#205781] shadow-md"
                            : "text-[#FAF1E6] hover:bg-[#FAF1E6]/10 active:bg-[#FAF1E6]/20"
                        }`}
                      >
                        {item.icon}
                        {item.label}
                      </Link>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>

              <div className="p-4 border-t border-[#FAF1E6]/10">
                <p className="text-[#FAF1E6]/70 text-sm text-center">
                  Explore the beauty of travel with us
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-16 md:pt-20"></div>
    </>
  );
};

export default Navbar;
