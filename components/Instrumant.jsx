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
    image: "/kanjira.jpg",
    description:
      "A handheld frame drum with jingles, similar to a tambourine, played in devotional and folk music.",
  },
];

const BadyaYantra = () => {
  return (
    <div className="bg-white py-12 px-4 sm:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-800">
        Traditional Musical Instruments of Uttarakhand
      </h2>
      <p className="text-center max-w-3xl mx-auto text-gray-600 mb-10">
        Uttarakhand&apos;s folk music is incomplete without its rich and diverse
        traditional instruments, known as
        <strong> Badya Yantra</strong>. These instruments are not only musical
        tools but also a vital part of religious, cultural, and community life.
        Each beat and blow carries the soul of the Himalayas.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {instruments.map((instrument, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-gray-100 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow"
          >
            <div className="relative h-[300px] w-full">
              <Image
                src={instrument.image}
                alt={instrument.name}
                width={500}
                height={300}
                className="hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {instrument.name}
              </h3>
              <p className="text-gray-600 text-sm">{instrument.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default BadyaYantra;
