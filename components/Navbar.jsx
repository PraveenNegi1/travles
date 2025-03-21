"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="bg-[#205781] p-4 shadow-md"
    >
      <div className=" flex justify-between  items-center ">
        <motion.h1
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
          className="text-2xl font-extrabold text-[#FAF1E6]  tracking-wide merriweather"
        >
          Travels
        </motion.h1>

        <ul className="hidden md:flex space-x-8 merriweather text-[18px] gap-4">
          <li>
            <Link
              href="/"
              className={`relative text-[#FAF1E6]  font-medium transition duration-300 hover:text-blue-300 ${
                pathname === "/" ? "border-b-2 border-blue-300" : ""
              }`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className={`relative text-[#FAF1E6] font-medium transition duration-300 hover:text-blue-300 ${
                pathname === "/about" ? "border-b-2 border-blue-300" : ""
              }`}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/Destinations"
              className={`relative text-[#FAF1E6]  font-medium transition duration-300 hover:text-blue-300 ${
                pathname === "/Destinations" ? "border-b-2 border-blue-300" : ""
              }`}
            >
              Destinations
            </Link>
          </li>

          <li>
            <Link
              href="/HowToReech"
              className={`relative text-[#FAF1E6]  font-medium transition duration-300 hover:text-blue-300 ${
                pathname === "/HowToReech" ? "border-b-2 border-blue-300" : ""
              }`}
            >
              How To Reach
            </Link>
          </li>
        </ul>
        <ul className="mr-10 hidden md:block merriweather text-[18px]">
          <li>
            <Link
              href="/Contect"
              className="text-[#FAF1E6] font-medium hover:text-blue-300"
              onClick={() => setIsOpen(false)}
            >
              Contect Us
            </Link>
          </li>
        </ul>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white">
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-[100vh] w-48 bg-[#205781] shadow-lg z-50 rounded-l-lg"
          >
            <div className="flex justify-end p-4">
              <button onClick={() => setIsOpen(false)} className="text-white">
                <X size={28} />
              </button>
            </div>
            <ul className="flex flex-col items-center gap-6 mt-10 merriweather">
              <li>
                <Link
                  href="/"
                  className="text-[#FAF1E6]  text-lg font-medium hover:text-blue-300"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-[#FAF1E6] text-lg font-medium hover:text-blue-300"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/Destinations"
                  className="text-[#FAF1E6] text-lg font-medium hover:text-blue-300"
                  onClick={() => setIsOpen(false)}
                >
                  Destinations
                </Link>
              </li>

              <li>
                <Link
                  href="/HowToReech"
                  className="text-[#FAF1E6] text-lg font-medium hover:text-blue-300"
                  onClick={() => setIsOpen(false)}
                >
                  How To Reach
                </Link>
              </li>

              <li>
                <Link
                  href="/Contect"
                  className="text-[#FAF1E6] text-lg font-medium hover:text-blue-300"
                  onClick={() => setIsOpen(false)}
                >
                  Contect Us
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
