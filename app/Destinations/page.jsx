"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const DestinationPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="relative w-full h-[400px] md:h-[500px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1608942025318-1191eeade556?q=80&w=2055&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center px-4">
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-white text-center"
          >
            Uttarakhand - The Land of Gods
          </motion.h1>
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-xl text-gray-300 mt-4 text-center"
          >
            Explore the beauty of the Himalayas and sacred temples
          </motion.p>

          <Link
            href="/district"
            className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition duration-300 shadow-lg"
          >
            Discover More
          </Link>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-16">
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-semibold text-gray-900 mb-6 text-center"
        >
          Discover Uttarakhand
        </motion.h2>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg text-gray-600 leading-relaxed text-center max-w-3xl mx-auto"
        >
          Uttarakhand, known as the "Land of Gods," is home to the majestic
          Himalayas, sacred rivers, and spiritual pilgrimage sites. From the
          holy cities of Haridwar and Rishikesh to the breathtaking valleys of
          Nainital and Mussoorie, Uttarakhand offers a perfect blend of natural
          beauty and spiritual peace.
        </motion.p>
      </div>
    </div>
  );
};

export default DestinationPage;
