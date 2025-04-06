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
    name: "Turri",
    image: "/Turri.jpeg",
    description:
      "A curved trumpet used in ceremonies. It produces a loud, deep sound and is considered a royal instrument.",
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
    <div className="bg-white py-16 px-4 sm:px-6 md:px-10 lg:px-20">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-7xl mx-auto"
      >
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-6 text-gray-800 relative inline-block"
          >
            <span className="bg-clip-text text-black ">
              Traditional Musical Instruments
            </span>
            <span className="block text-xl sm:text-2xl mt-2 font-normal text-gray-700">
              of Uttarakhand
            </span>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-amber-500 rounded-full"></div>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="max-w-3xl mx-auto text-gray-600 text-sm sm:text-base lg:text-lg"
          >
            Uttarakhand&apos;s folk music is incomplete without its rich and
            diverse traditional instruments, known as
            <span className="font-semibold text-black"> Badya Yantra</span>.
            These instruments are not only musical tools but also a vital part
            of religious, cultural, and community life. Each beat and blow
            carries the soul of the Himalayas.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 xl:gap-10">
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
              <div className="relative h-60 sm:h-64 md:h-72 w-full overflow-hidden">
                <Image
                  src={instrument.image}
                  alt={instrument.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110 rounded-t-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white font-bold text-lg">
                    {instrument.name}
                  </div>
                </div>
              </div>

              <div className="p-5 md:p-6">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
                  {instrument.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base">
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
