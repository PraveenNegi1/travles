"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
const Laptop = () => {
  const containerRef = useRef(null);
  const laptopRef = useRef(null);
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoSrc, setVideoSrc] = useState("/video/travlevideo.mp4");
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      setVideoSrc(isMobileView ? "/video/travlevideo.mp4" : "/video/travlevideo.mp4");
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  const lidRotation = useTransform(smoothProgress, [0, 0.4], [-80, 0]);
  const screenScale = useTransform(smoothProgress, [0, 0.4], [0.9, 1]);
  const mobileX = useTransform(smoothProgress, [0, 0.3, 0.5], [300, 0, 0]);
  const mobileRotateZ = useTransform(
    smoothProgress,
    [0, 0.2, 0.4],
    [-30, -15, 0]
  );
  const mobileScale = useTransform(
    smoothProgress,
    [0, 0.3, 0.5],
    [0.7, 0.85, 1]
  );
  const shadowOpacity = useTransform(smoothProgress, [0, 0.4], [0.4, 0.1]);
  const shadowY = useTransform(smoothProgress, [0, 0.4], [30, 10]);
  const screenBrightness = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const mobileShadowTransform = useTransform(
    smoothProgress,
    [0, 0.5],
    ["0px 20px 50px rgba(0,0,0,0.6)", "0px 10px 30px rgba(0,0,0,0.3)"]
  );
  useEffect(() => {
    const unsubscribe = smoothProgress.onChange((latest) => {
      if (latest > 0.45 && !isVideoPlaying) {
        if (videoRef.current) {
          videoRef.current.play().catch((error) => {
            console.warn("Autoplay prevented:", error);
            setHasInteracted(true);
          });
          setIsVideoPlaying(true);
        }
      }
    });
    return () => unsubscribe();
  }, [smoothProgress, isVideoPlaying]);
  const handleInteraction = () => {
    if (hasInteracted && videoRef.current) {
      videoRef.current
        .play()
        .catch((e) => console.error("Video play failed:", e));
      setHasInteracted(false);
    }
  };
  return (
    <div
      ref={containerRef}
      className="h-[300vh] w-full relative"
      onClick={handleInteraction}
    >
      <div className="sticky top-0 flex items-center justify-center w-full h-screen p-4 overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-20 rounded-full blur-3xl"
          style={{
            scale: useTransform(smoothProgress, [0, 0.5], [0.5, 1.2]),
            opacity: useTransform(smoothProgress, [0, 0.5], [0.05, 0.2]),
          }}
        />
        {isMobile ? (
          <motion.div
            className="relative w-[80%] max-w-[360px] h-[600px] flex items-center justify-center "
            style={{
              perspective: "2000px",
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              className="absolute w-full h-full bg-transparent z-10 rounded-3xl"
              style={{
                transformStyle: "preserve-3d",
                x: mobileX,
                rotateZ: mobileRotateZ,
                scale: mobileScale,
                transformOrigin: "center center",
                boxShadow: mobileShadowTransform,
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-3xl overflow-hidden border-[8px] border-gray-800"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute inset-0 bg-black rounded-2xl overflow-hidden flex items-center justify-center">
                  <div className="absolute top-2 w-[80px] h-[20px] bg-black rounded-full z-50 left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-[8px] h-[8px] bg-gray-900 rounded-full mx-1">
                      <div className="w-[3px] h-[3px] bg-gray-700 rounded-full absolute inset-0 m-auto" />
                    </div>
                  </div>
                  <motion.div
                    className="absolute inset-0 -z-0 overflow-hidden"
                    style={{
                      filter: `brightness(${screenBrightness.get()})`,
                    }}
                  >
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      src={videoSrc}
                      autoPlay
                      playsInline
                      muted
                      loop
                    />
                    {hasInteracted && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-8 border-b-8 border-transparent border-l-12 border-l-white ml-1" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
              <div className="absolute right-[-2px] top-[100px] h-[60px] w-[2px] bg-gray-700 rounded-r-lg" />
              <div className="absolute right-[-2px] top-[180px] h-[100px] w-[2px] bg-gray-700 rounded-r-lg" />
              <div className="absolute left-[-2px] top-[120px] h-[40px] w-[2px] bg-gray-700 rounded-l-lg" />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            className="relative w-[95%] sm:w-[90%] max-w-[1000px] h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] flex items-center justify-center"
            style={{
              perspective: "2000px",
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              ref={laptopRef}
              className="absolute w-[110%] h-[150%] sm:h-[520px] bg-transparent z-10 mt-10"
              style={{
                transformStyle: "preserve-3d",
                rotateX: lidRotation,
                scale: screenScale,
                transformOrigin: "bottom center",
              }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-gray-800 via-gray-700 to-gray-800 rounded-xl overflow-hidden"
                style={{
                  transformStyle: "preserve-3d",
                  boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
                }}
              >
                <div className="absolute inset-[4px] sm:inset-[6px] md:inset-[8px] bg-black rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="absolute rounded-full top-[16px] sm:top-[40px] md:top-[30px] z-50 left-1/2 transform -translate-x-1/2 flex items-center bg-black justify-center">
                    <div className="w-[4px] h-[4px] sm:w-[6px] sm:h-[6px] md:w-[8px] md:h-[8px] bg-gray-900 rounded-full z-50">
                      <div className="w-[2px] h-[2px] sm:w-[2px] sm:h-[2px] md:w-[3px] md:h-[3px] bg-gray-800 rounded-full absolute inset-0 m-auto" />
                    </div>
                  </div>
                  <motion.div
                    className="absolute inset-[6px] sm:inset-[8px] md:inset-[12px] -z-0 rounded-md overflow-hidden"
                    style={{
                      filter: `brightness(${screenBrightness.get()})`,
                    }}
                  >
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      src={videoSrc}
                      autoPlay
                      playsInline
                      muted
                      loop
                    />
                    {hasInteracted && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-4 border-b-4 sm:border-t-6 sm:border-b-6 md:border-t-8 md:border-b-8 border-transparent border-l-6 sm:border-l-9 md:border-l-12 border-l-white ml-1" />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </div>
                <div className="absolute -top-[1px] -bottom-[1px] -left-[1px] -right-[1px] rounded-xl bg-gray-700 -z-10" />
              </motion.div>
            </motion.div>
            <div className="absolute bottom-[6px] w-[130%] -left-[15%] sm:-left-[18%] md:-left-[20%] lg:-left-[140px] h-3 sm:h-4 md:h-5 lg:h-6 right-0 bg-gray-600 rounded-b-lg z-20" />
          </motion.div>
        )}
      </div>
    </div>
  );
};
export default Laptop;
