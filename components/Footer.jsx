"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaInstagram,
  FaLinkedin,
  FaGithub,
  FaHeart,
  FaArrowUp,
} from "react-icons/fa";
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
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const heartVariants = {
    beat: {
      scale: [1, 1.2, 1],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-r from-[#1a4766] via-[#205781] to-[#1a4766] text-[#FAF1E6] py-10 sm:py-12 md:py-16 merriweather overflow-hidden md:text-[18px]">
      <div className="absolute top-0 left-0 w-full h-16 bg-wave-pattern bg-repeat-x bg-[length:100px_16px] opacity-20"></div>

      <motion.div
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"}
        variants={containerVariants}
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-12 lg:gap-16">
          <motion.div
            variants={itemVariants}
            className="text-center sm:text-left"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 tracking-tight">
              About Us
            </h2>
            <p className="text-[#EDE4D3] text-sm sm:text-base leading-relaxed max-w-xs mx-auto sm:mx-0">
              Embark on unforgettable journeys with us. Explore the world’s most
              breathtaking destinations!
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center sm:text-left"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 tracking-tight">
              Explore
            </h2>
            <ul className="space-y-3">
              {[
                { href: "/destinations", label: "destinations" },
                { href: "/blogs", label: "Travel Blogs" },
                { href: "/about", label: "About" },
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Link
                    href={item.href}
                    className="relative text-[#EDE4D3] text-sm sm:text-base font-medium transition duration-300 hover:text-[#FFD700] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FFD700] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center sm:text-left"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 tracking-tight">
              Get in Touch
            </h2>
            <div className="flex items-center justify-center sm:justify-start space-x-4 sm:space-x-6 mt-4">
              {[
                {
                  href: "https://instagram.com",
                  icon: <FaInstagram size={22} />,
                  bg: "bg-gradient-to-r from-[#FF0069] to-[#7638FA]",
                },
                {
                  href: "https://www.linkedin.com/in/praveen-negi1",
                  icon: <FaLinkedin size={22} />,
                  bg: "bg-[#0077b5]",
                },

                {
                  href: "https://github.com/PraveenNegi1",
                  icon: <FaGithub size={22} />,
                  bg: "bg-[#333]",
                },
              ].map((social, idx) => (
                <motion.a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.bg} p-3 rounded-full transition duration-300 hover:shadow-[0_0_15px_rgba(255,215,0,0.5)]`}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="text-center sm:text-left"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-4 tracking-tight">
              Quick Links
            </h2>
            <ul className="space-y-3">
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href="/contact"
                  className="relative text-[#EDE4D3] text-sm sm:text-base font-medium transition duration-300 hover:text-[#FFD700] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FFD700] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Contact Us
                </Link>
              </motion.li>
              <motion.li
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Link
                  href="/privacy"
                  className="relative text-[#EDE4D3] text-sm sm:text-base font-medium transition duration-300 hover:text-[#FFD700] after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#FFD700] after:left-0 after:-bottom-1 after:transition-all after:duration-300 hover:after:w-full"
                >
                  Privacy Policy
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          className="border-t border-[#EDE4D3]/20 my-8 sm:my-10"
        ></motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left gap-4 sm:gap-0"
        >
          <p className="text-[#EDE4D3] text-xs sm:text-sm">
            © {new Date().getFullYear()} Raaही. All rights reserved.
          </p>
        </motion.div>
      </motion.div>

      <style jsx>{`
        .bg-wave-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='16' viewBox='0 0 100 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 8c25-8 75-8 100 0' fill='none' stroke='%23EDE4D3' stroke-width='2' stroke-opacity='0.3'/%3E%3C/svg%3E");
        }
      `}</style>
    </footer>
  );
};

export default Footer;
