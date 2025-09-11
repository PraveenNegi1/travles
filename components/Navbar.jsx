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
  Package,
} from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const sidebarRef = useRef(null);

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
      href: "/packages",
      label: "Packages",
      icon: <Package size={20} strokeWidth={2} />,
    },
    {
      href: "/contact",
      label: "Contact Us",
      icon: <Phone size={20} strokeWidth={2} />,
    },
  ];

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: hidden ? -100 : 0, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed w-full z-40 transition-all duration-300 ${
          scrolled
            ? "bg-[#205781]/95 backdrop-blur-md py-2 shadow-lg"
            : "bg-gradient-to-r from-[#205781] to-[#1c4e75] py-3 lg:py-4"
        }`}
      >
        <div className="mx-auto px-3 sm:px-5 lg:px-6 py-2 flex justify-between items-center overflow-hidden">
          <Link href="/">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <div className="w-[100px] h-[30px]">
                <img
                  src="/logo/Raahi.png"
                  alt="Beautiful Uttarakhand"
                  className=" object-cover object-top"
                />
              </div>
            </motion.div>
          </Link>
          <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
            <ul className="flex flex-wrap items-center space-x-2 xl:space-x-4 whitespace-nowrap merriweather">
              {navItems.map((item) => (
                <li key={item.href} className="relative group">
                  <Link
                    href={item.href}
                    className={`relative font-medium transition-all duration-300 px-2 py-1.5 lg:px-2.5 lg:py-1.5 xl:px-3 xl:py-2 rounded-full flex items-center gap-1 text-sm lg:text-[15px] xl:text-[17px] hover:scale-105 whitespace-nowrap ${
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
                        className="absolute inset-0 rounded-full "
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
          </div>

          <div className="lg:hidden">
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
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-[280px] z-50 lg:hidden"
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
                 

                  <div className="w-[80px] h-[50px]">
                    <img
                      src="/logo/Raahi.png"
                      alt="Beautiful Uttarakhand"
                      className=" object-cover"
                    />
                  </div>
                </div>
              </div>

              <div className="overflow-y-auto flex-grow">
                <motion.ul
                  className="py-4 px-2 space-y-1 merriweather text-[15px] sm:text-base"
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
                        className={`flex items-center gap-2 sm:gap-3 text-[15px] sm:text-base font-medium px-3 py-2.5 sm:px-4 sm:py-3 rounded-lg ${
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
                <p className="text-[#FAF1E6]/70 text-xs sm:text-sm text-center">
                  Explore the beauty of travel with us
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-16 lg:pt-20"></div>
    </>
  );
};

export default Navbar;
