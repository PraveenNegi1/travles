"use client";
import React, { useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

function GradualSpacing({ text = "", onComplete }) {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="flex space-x-1 justify-center">
      <AnimatePresence>
        {text.split("").map((char, i) => (
          <motion.p
            ref={ref}
            key={i}
            initial={{ opacity: 0, x: -18 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            exit="hidden"
            transition={{
              duration: 0.5,
              delay: i * 0.1,
              onComplete: i === text.length - 1 ? onComplete : undefined,
            }}
            className="text-[25px] text-center md:text-[50px] tracking-tighter text-blue-600 pt-3  md:leading-[4rem]"
          >
            {char === " " ? <span>&nbsp;</span> : char}
          </motion.p>
        ))}
      </AnimatePresence>
    </div>
  );
}

const Animation = () => {
  const [showSecond, setShowSecond] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <GradualSpacing
        text="This is the Animation components"
        onComplete={() => setShowSecond(true)}
      />
    </div>
  );
};

export default Animation;
