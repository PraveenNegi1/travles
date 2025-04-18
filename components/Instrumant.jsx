"use client";
import { motion } from "framer-motion";
import Image from "next/image";

const instruments = [
  {
    name: "Dhol Damau",
    image: "/dhol-damou.webp",
    description:
      "A traditional drum duo used in almost every folk ritual, celebration, and procession across Garhwal and Kumaon.",
  },
  {
    name: "Masak Baja",
    image: "/musical-rosewood-bagpipes.jpg",
    description:
      "A folk bagpipe, producing deep resonant notes. It's often played during festive dances and cultural ceremonies.",
  },
  {
    name: "Hudka",
    image: "/Hudka.webp",
    description:
      "Played with a curved stick, this hourglass-shaped drum accompanies the popular folk dance 'Hudkeli'.",
  },
  {
    name: "Ransingha",
    image: "/Ransingha.jpg",
    description:
      "A trumpet-like brass instrument in an 'S' or crescent shape, used during rituals, temple processions, and battle cries in ancient times.",
  },
  {
    name: "Bhankora",
    image: "/Bhankora.jpg",
    description:
      "Made of copper or brass, this long wind instrument is played during religious gatherings and folk ceremonies.",
  },
  {
    name: "Nagphani",
    image: "/Nagphani.avif",
    description:
      "A snake-shaped wind instrument traditionally blown to mark auspicious events or to gather people.",
  },
  
  {
    name: "Thali",
    image: "/thali.webp",
    description:
      "Literally a metal plate, used rhythmically during bhajans and folk singing, hit with sticks or spoons.",
  },
  {
    name: "Khanjari",
    image: "/Kanjira.jpg",
    description:
      "A handheld frame drum with jingles, similar to a tambourine, played in devotional and folk music.",
  },
];

const BadyaYantra = () => {
  return (
    <div className="bg-white py-8 sm:py-12 md:py-16 px-4 sm:px-6 md:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-8 sm:mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold font-serif mb-4 sm:mb-6 text-gray-800 relative inline-block"
          >
            <span className="bg-clip-text text-black">
              Traditional Musical Instruments
            </span>
            <span className="block text-lg sm:text-xl mt-2 font-normal text-gray-700">
              of Uttarakhand
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-1 bg-amber-500 rounded-full"></div>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg lg:text-xl merriweather"
          >
            Uttarakhand&apos;s folk music is incomplete without its rich and
            diverse traditional instruments, known as
            <span className="font-semibold text-black"> Badya Yantra</span>.
            These instruments are not only musical tools but also a vital part
            of religious, cultural, and community life. Each beat and blow
            carries the soul of the Himalayas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {instruments.map((instrument, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
              className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="relative w-full pt-[60%] sm:pt-[56%]">
                <Image
                  src={instrument.image}
                  alt={instrument.name}
                 width={1000}
                 height={1000}
                  className="object-cover absolute top-0 left-0 w-full h-full transition-transform duration-700 ease-in-out group-hover:scale-110 rounded-t-2xl"
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-3 sm:p-4 text-white font-bold text-base sm:text-lg">
                    {instrument.name}
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-5 md:p-6">
                <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800 mb-2 sm:mb-3 font-serif">
                  {instrument.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base md:text-lg merriweather">
                  {instrument.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default BadyaYantra;
