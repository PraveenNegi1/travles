"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { db } from "@/lib/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const Popup = ({
  isOpen,
  onClose,
  title = "Contact Us",
  subtitle = "Let's discuss your perfect travel with Raaही",
  apiEndpoint = "/api/send-email",
  price,
  packageTitle,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;

    const data = {
      name: form.elements.name.value,
      email: form.elements.email.value,
      phone: form.elements.phone.value,
      message: form.elements.message.value,
      packageTitle: packageTitle || "N/A",
      price: price || "N/A",
      createdAt: Timestamp.now(),
    };

    try {
      await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      await addDoc(collection(db, "travelInquiries"), data);

      form.reset();
      onClose();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: { duration: 0.2 },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.4 },
    },
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0  bg-black/70 backdrop-blur-md z-50 flex items-center justify-center px-3 sm:px-5"
      onClick={onClose}
    >
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-white/80  dark:bg-[#0f172a]/90 backdrop-blur-lg p-5 sm:p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-white/20 relative overflow-y-auto max-h-[90vh]"
      >
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          className="absolute top-3 cursor-pointer right-3 sm:top-4 sm:right-4 w-9 h-9 bg-[#205781] text-white rounded-full flex items-center justify-center text-lg font-bold hover:shadow-xl transition-all"
        >
          ✕
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-2xl sm:text-3xl font-bold bg-[#205781] bg-clip-text text-transparent">
            {title}
          </h2>
          <p className="text-slate-700 dark:text-slate-300 text-sm sm:text-base mt-1">
            {subtitle}
          </p>

          {packageTitle && price && (
            <p className="mt-4 text-[17px] font-semibold text-[#205781]">
              Booking for: <span className="font-bold">{packageTitle}</span> —{" "}
              <span className="text-green-600">{price}</span>
            </p>
          )}
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial="hidden"
          animate="visible"
          className="space-y-4 "
        >
          <motion.div variants={inputVariants}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              required
              className="w-full p-3 border  border-slate-300 rounded-xl bg-white text-sm sm:text-base focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
              className="w-full p-3 border border-slate-300 rounded-xl bg-white text-sm sm:text-base focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              required
              className="w-full p-3 border border-slate-300 rounded-xl bg-white text-sm sm:text-base focus:ring-2 focus:ring-indigo-400 outline-none transition"
            />
          </motion.div>

          <motion.div variants={inputVariants}>
            <textarea
              name="message"
              rows="4"
              placeholder="Tell us about your requirements..."
              required
              className="w-full p-3 border border-slate-300 rounded-xl bg-white text-sm sm:text-base resize-none focus:ring-2 focus:ring-indigo-400 outline-none transition"
            ></textarea>
          </motion.div>

          <motion.button
            variants={inputVariants}
            type="submit"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.02 } : {}}
            whileTap={!isLoading ? { scale: 0.98 } : {}}
            className={`w-full text-white font-semibold py-3 cursor-pointer rounded-xl bg-gradient-to-r from-[#205781] to-purple-700 shadow-lg hover:shadow-xl transition duration-300 ${
              isLoading ? "cursor-not-allowed opacity-80" : ""
            }`}
          >
            <span className="flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Sending...
                </>
              ) : (
                <>
                  Send Message{" "}
                  <motion.span
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  ></motion.span>
                </>
              )}
            </span>
          </motion.button>
        </motion.form>
      </motion.div>
    </motion.div>
  );
};

export default Popup;
