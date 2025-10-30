"use client";

import Link from "next/link";
import { packages } from "@/lib/packageData";
import Image from "next/image";
import { motion } from "framer-motion";

const PackagesPage = () => {
  return (
    <div className="min-h-screen  font-serif relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-200/30 to-teal-200/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 py-8 md:py-12 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-16 md:mb-20"
          >
            <h1 className="text-3xl  md:text-5xl  font-extrabold bg-gradient-to-r from-gray-900 via-blue-800 to-[#205781] bg-clip-text text-transparent mb-6 tracking-tight leading-tight">
              Discover Uttarakhand
              <br className="hidden sm:block" />{" "}
              <span className="bg-gradient-to-r from-[#205781] to-blue-600 bg-clip-text text-transparent">
                Adventures
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed"
            >
              Embark on extraordinary journeys through pristine mountains,
              serene valleys, and spiritual destinations with our expertly
              curated travel experiences
            </motion.p>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="w-32 h-1.5 bg-gradient-to-r from-blue-600 via-[#205781] to-[#09263d] mx-auto rounded-full shadow-lg"
            ></motion.div>
          </motion.div>

          <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                whileHover={{
                  y: -8,
                  transition: { duration: 0.3, ease: "easeOut" },
                }}
                className="group"
              >
                <Link
                  href={`/packages/${pkg.id}`}
                  className="block bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-white/50 hover:border-teal-200/50 relative"
                >
                  <div className="relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>

                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      width={800}
                      height={500}
                      className="rounded-t-3xl object-cover h-52 sm:h-60 lg:h-64 w-full transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                      priority={index < 3}
                    />

                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="absolute top-4 right-4 z-20"
                    >
                      <div className="bg-gradient-to-r from-[#205781] to-blue-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-xl backdrop-blur-sm border border-white/20">
                        <span className="drop-shadow-sm">{pkg.price}</span>
                      </div>
                    </motion.div>

                    <div className="absolute top-4 left-4 z-20 bg-white/90 backdrop-blur-sm text-gray-800 px-3 py-1.5 rounded-2xl text-xs font-semibold shadow-lg border border-gray-200/50">
                      {pkg.duration}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 z-10"></div>
                  </div>

                  <div className="p-6 sm:p-7 lg:p-8 relative">
                    <div className="absolute top-0 left-6 w-12 h-1 bg-gradient-to-r from-teal-500 to-[#205781] rounded-full transform -translate-y-0.5"></div>

                    <div className="mb-4">
                      <h2 className="text-xl   font-bold text-gray-900 group-hover:text-teal-700 transition-colors duration-300 leading-tight mb-2">
                        {pkg.title}
                      </h2>
                    </div>

                    <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6 line-clamp-3 group-hover:text-gray-700 transition-colors duration-300">
                      {pkg.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-1">
                          Starting From
                        </span>
                        <span className="text-[#205781] font-bold text-lg sm:text-xl">
                          {pkg.price}
                        </span>
                      </div>

                      <motion.div
                        whileHover={{ x: 5 }}
                        className="flex items-center bg-gradient-to-r from-[#205781] to-teal-600 text-white px-4 py-2.5 rounded-2xl font-semibold text-sm shadow-md group-hover:shadow-lg transition-all duration-300"
                      >
                        <span className="mr-2">Explore</span>
                        <motion.svg
                          whileHover={{ x: 3 }}
                          className="w-4 h-4 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </motion.svg>
                      </motion.div>
                    </div>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000"></div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackagesPage;
