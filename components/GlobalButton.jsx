"use client";
import React, { useState, useEffect, useRef } from "react";

export default function GlobalButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  
  useEffect(() => {
    // Check if device is mobile or tablet based on screen width
    const checkDeviceType = () => {
      // Common breakpoint for desktop is 1024px and above
      const isMobileTabletView = window.innerWidth < 1024;
      setIsMobileOrTablet(isMobileTabletView);
    };
    
    // Check footer visibility
    const toggleVisibility = () => {
      const footer = document.querySelector("footer") || document.getElementById("footer");
      
      if (footer) {
        const footerPosition = footer.getBoundingClientRect();
        if (footerPosition.top < window.innerHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };
    
    // Initial checks
    checkDeviceType();
    toggleVisibility();
    
    // Add event listeners
    window.addEventListener("scroll", toggleVisibility);
    window.addEventListener("resize", checkDeviceType);
    
    // Cleanup
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
  
  // Only render if both conditions are met: footer is visible AND on mobile/tablet
  return (
    <>
      {isVisible && isMobileOrTablet && (
        <button
          className="fixed bottom-8 right-8 p-3 bg-[#205781] text-white rounded-2xl shadow-lg hover:bg-[#485f76] transition-colors duration-300 flex items-center justify-center z-50"
          onClick={scrollToTop}
        >
          <svg
            className="w-6 h-6"
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