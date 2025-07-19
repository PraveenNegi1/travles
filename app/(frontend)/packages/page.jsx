"use client";

import Link from "next/link";
import { packages } from "@/lib/packageData";
import Image from "next/image";
import { motion } from "framer-motion";

const PackagesPage = () => {
  return (
    <div className="min-h-screen font-serif py-8 md:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Discover Uttarakhand Adventures
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            Explore our curated travel packages for an unforgettable journey
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-teal-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={`/packages/${pkg.id}`}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden border border-gray-100"
              >
                <div className="relative overflow-hidden">
                  <Image
                    src={pkg.image}
                    alt={pkg.title}
                    width={800}
                    height={500}
                    className="rounded-t-2xl object-cover h-48 sm:h-56 w-full transition-transform duration-500 group-hover:scale-110"
                    priority={index < 3}
                  />
                  <div className="absolute top-4 right-4 bg-teal-500 text-white px-3 py-1 rounded-full text-xs sm:text-sm font-semibold shadow-md transform group-hover:scale-105 transition-transform">
                    {pkg.price}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-4 sm:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors duration-300">
                      {pkg.title}
                    </h2>
                    <span className="text-xs sm:text-sm text-blue-700 bg-blue-100 px-2 py-1 rounded-full font-medium">
                      {pkg.duration}
                    </span>
                  </div>

                  <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-4 line-clamp-3">
                    {pkg.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-teal-600 font-bold text-base sm:text-lg">
                      {pkg.price}
                    </span>
                    <div className="flex items-center text-blue-700 font-semibold text-sm sm:text-base group-hover:text-teal-600 transition-colors duration-300">
                      Explore Now
                      <svg
                        className="w-4 h-4 sm:w-5 sm:h-5 ml-1 transform group-hover:translate-x-2 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
