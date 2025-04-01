"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaGithub, FaHeart } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <footer className="bg-[#205781] text-[#FAF1E6] py-6 sm:py-8 merriweather text-sm sm:text-base md:text-lg">
      <motion.div
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-12 md:gap-16 lg:gap-20 max-w-6xl mx-auto">
          <motion.div variants={itemVariants} className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">About Us</h2>
            <p className="text-[#FAF1E6] text-sm sm:text-base max-w-xs mx-auto sm:mx-0">
              Discover the world's best destinations with us. Your adventure
              starts here!
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Explore</h2>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/Destinations"
                  className="relative text-[#FAF1E6] font-medium transition duration-300 hover:text-blue-300 inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-300 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Destinations
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="relative text-[#FAF1E6] font-medium transition duration-300 hover:text-blue-300 inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-300 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Travel Blogs
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="relative text-[#FAF1E6] font-medium transition duration-300 hover:text-blue-300 inline-block after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-300 after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
                >
                  About
                </Link>
              </li>
            </ul>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center sm:text-left">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Get in Touch</h2>
            <div className="flex items-center justify-center sm:justify-start space-x-5 mt-3 sm:mt-4">
              <motion.a
                href="https://instagram.com/yourcompany"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-[#FF0069] to-[#7638FA] p-2 rounded-full transition duration-300 hover:shadow-glow"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaInstagram size={20} />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/praveen-negi1/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#FAF1E6] bg-[#0077b5] p-2 rounded-full transition duration-300 hover:shadow-glow"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaLinkedin size={20} />
              </motion.a>
              <motion.a
                href="https://github.com/PraveenNegi1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#205781] bg-[#FAF1E6] p-2 rounded-full transition duration-300 hover:shadow-glow"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub size={20} />
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-[#FAF1E6]/30 my-5 sm:my-6"
        ></motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center sm:justify-between text-center sm:text-left space-y-2 sm:space-y-0"
        >
          <p className="text-[#FAF1E6] text-xs sm:text-sm">
            © {new Date().getFullYear()} Travels. All rights reserved.
          </p>
          <p className="text-[#FAF1E6] text-xs sm:text-sm flex items-center">
            Designed with{" "}
            for travels.
          </p>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;