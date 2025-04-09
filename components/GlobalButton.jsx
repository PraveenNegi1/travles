"use client";
import React, { useState, useEffect, useRef } from "react";

export default function GlobalButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);

  useEffect(() => {
    const checkDeviceType = () => {
      const isMobileTabletView = window.innerWidth < 1024;
      setIsMobileOrTablet(isMobileTabletView);
    };

    const toggleVisibility = () => {
      const footer =
        document.querySelector("footer") || document.getElementById("footer");

      if (footer) {
        const footerPosition = footer.getBoundingClientRect();
        if (footerPosition.top < window.innerHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    checkDeviceType();
    toggleVisibility();

    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", checkDeviceType);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", checkDeviceType);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && isMobileOrTablet && (
        <button
          className="fixed bottom-8 right-6 p-3 bg-white text-[#205781] border-[#205781] border-2 rounded-2xl shadow-lg hover:bg-[#485f76] transition-colors duration-300 flex items-center justify-center z-50"
          onClick={scrollToTop}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            ></path>
          </svg>
        </button>
      )}
    </>
  );
}
