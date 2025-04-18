"use client";
import React, { useState, useEffect, useRef } from "react";

export default function GlobalButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const checkDeviceType = () => {
      const isMobileTabletView = window.innerWidth < 1024;
      setIsMobileOrTablet(isMobileTabletView);
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Button is visible when scrolling up and not at the top of the page
      if (currentScrollY < lastScrollY.current && currentScrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      lastScrollY.current = currentScrollY;
    };

    checkDeviceType();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", checkDeviceType);

    return () => {
      window.removeEventListener("scroll", handleScroll);
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
          className="fixed   left-1/2 bottom-8  p-3 bg-white text-[#205781] border-[#205781] border-2 rounded-2xl shadow-lg hover:bg-[#485f76] transition-colors duration-300  z-50"
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
