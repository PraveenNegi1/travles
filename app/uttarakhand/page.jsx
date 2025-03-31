"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useState } from "react";

const historyData = {
  uttarakhand: {
    title: "History of Uttarakhand",
    image: "/uttarakhand-map.png",
    content: [
      {
        label: "🏛️ Ancient Origins:",
        text: "Known as 'Kedarkhand' in ancient times, the region finds mention in the Puranas and Mahabharata.",
      },
      {
        label: "🏰 Medieval Period:",
        text: "Ruled by various dynasties including the Kunindas, Katyuris, Panwars, Karkotas, and Chands.",
      },
      {
        label: "⚔️ Gorkha Invasion:",
        text: "The Gorkhas of Nepal conquered the region in the late 18th century before being defeated by the British in 1815.",
      },
      {
        label: "🇬🇧 British Rule:",
        text: "Following the Anglo-Nepalese War (1814-1816), the region was annexed to British India under the Treaty of Sugauli.",
      },
      {
        label: "🪧 Separate State Movement:",
        text: "The movement for a separate state gained momentum in the 1990s led by organizations like Uttarakhand Kranti Dal.",
      },
      {
        label: "🗓️ Statehood:",
        text: "On November 9, 2000, Uttarakhand (initially named Uttaranchal) was carved out of Uttar Pradesh as the 27th state of India.",
      },
    ],
  },
  garhwal: {
    title: "History of Garhwal",
    image: "/garhwal-history.jpg",
    content: [
      {
        label: "📜 Ancient Era:",
        text: "Originally known as 'Kedar Khand' in ancient Hindu texts, Garhwal was considered the abode of gods.",
      },
      {
        label: "👑 Katyuri Dynasty:",
        text: "One of the earliest rulers (7th-11th century CE), who established their capital at Baijnath in present-day Kumaon.",
      },
      {
        label: "🏯 Panwar Dynasty:",
        text: "Following the decline of Katyuris, Garhwal was ruled by the Panwar dynasty for nearly 1000 years (823-1804 CE).",
      },
      {
        label: "🛡️ Kingdom of Garhwal:",
        text: "Established by Ajay Pal (1358), who unified 52 small garhs (fortresses) forming 'Garhwal' - the land of many forts.",
      },
      {
        label: "⚔️ Gorkha Invasion:",
        text: "In 1804, the Gorkhas invaded Garhwal, defeating King Pradyumna Shah. His son Sudarshan Shah reclaimed the western part with British help in 1815.",
      },
      {
        label: "🇬🇧 British Period:",
        text: "After 1815, Garhwal was divided: eastern part went to the British (British Garhwal), while western part remained under Tehri kings (Princely State of Tehri Garhwal).",
      },
      {
        label: "🇮🇳 Post-Independence:",
        text: "After India's independence, Tehri Garhwal merged with the Indian Union in 1949. The region became part of Uttarakhand state in 2000.",
      },
    ],
  },
  kumaon: {
    title: "History of Kumaon",
    image: "/kumaon-history.jpg",
    content: [
      {
        label: "🏺 Ancient History:",
        text: "Archaeological evidence suggests human settlement since prehistoric times. The region is mentioned in ancient texts as 'Kurmanchal'.",
      },
      {
        label: "👑 Katyuri Dynasty:",
        text: "The first major dynasty (7th-11th century CE) established their capital at Baijnath, building numerous temples and irrigation systems.",
      },
      {
        label: "🏰 Chand Dynasty:",
        text: "Ruled from the 11th to 18th century, establishing their capital at Champawat and later shifting to Almora in 1563.",
      },
      {
        label: "🏛️ Cultural Golden Age:",
        text: "Under Chand rulers, particularly during Raja Baz Bahadur Chand's reign (1638-1678), Kumaon experienced cultural and artistic flourishing.",
      },
      {
        label: "⚔️ Gorkha Invasion:",
        text: "In 1790, the Gorkhas of Nepal invaded and conquered Kumaon, ending Chand rule. Their harsh administration led to local discontent.",
      },
      {
        label: "🇬🇧 British Rule:",
        text: "Following the Anglo-Nepalese War, the British gained control of Kumaon in 1815 and established administrative headquarters at Nainital in 1841.",
      },
      {
        label: "🪧 Freedom Movement:",
        text: "Kumaon played a significant role in India's freedom struggle, with notable participation in the Non-Cooperation Movement and Civil Disobedience Movement.",
      },
      {
        label: "🇮🇳 Modern Era:",
        text: "After independence, Kumaon became part of Uttar Pradesh and later was included in the newly formed state of Uttarakhand in 2000.",
      },
    ],
  },
};

const diversityData = [
  {
    id: "garhwal",
    title: "Diversity of Garhwal",
    image: "/garhwal.jpg",

    contentAnimation: {
      hidden: { y: -100, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    imageAnimation: {
      hidden: { x: 100, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    content: [
      {
        label: "🌿 Rich Cultural Heritage:",
        text: "Known for traditional music, dance, and festivals.",
      },
      {
        label: "🛕 Sacred Pilgrimage:",
        text: "Home to the Char Dham — Badrinath, Kedarnath, Gangotri, and Yamunotri.",
      },
      {
        label: "🎶 Folk Music & Dance:",
        text: '"Pandav Nritya" and "Langvir Nritya" showcase its spiritual roots.',
      },
      {
        label: "🍛 Cuisine:",
        text: 'Famous for "Chainsoo," "Aloo Ke Gutke," and "Mandua Roti."',
      },
      {
        label: "🎊 Festivals:",
        list: [
          "Phool Dei (celebrating spring)",
          "Ghee Sankranti (harvest festival)",
        ],
      },
      {
        label: "🏞️ Major Attractions:",
        list: [
          "Valley of Flowers (UNESCO site)",
          "Tungnath Temple (world's highest Shiva temple)",
          "Auli (famous for skiing)",
        ],
      },
    ],
  },
  {
    id: "kumaon",
    title: "Diversity of Kumaon",
    image: "/kumon.jpg",

    contentAnimation: {
      hidden: { y: 100, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    imageAnimation: {
      hidden: { x: -100, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    content: [
      {
        label: "🎨 Vibrant Culture:",
        text: "Famous for colorful festivals, folk music, and crafts.",
      },
      {
        label: "🏔️ Scenic Beauty:",
        text: "Known for the lush green hills of Almora and tranquil lakes of Nainital.",
      },
      {
        label: "🎶 Folk Music & Dance:",
        text: 'Includes "Hudka" and "Turri" instruments, reflecting themes of nature and love.',
      },
      {
        label: "🍛 Cuisine:",
        list: [
          "Bhatt Ki Churkani (black bean curry)",
          "Thechwani (radish-based curry)",
          "Baadi (black soy curry)",
        ],
      },
      {
        label: "🎊 Festivals:",
        list: [
          "Nanda Devi Fair (Goddess Nanda celebration)",
          "Hilljatra (harvest festival)",
          "Harela (welcoming the monsoon)",
        ],
      },
      {
        label: "🌄 Major Attractions:",
        list: [
          "Jim Corbett National Park (India's first tiger reserve)",
          "Ranikhet (colonial hill station)",
          "Kausani (Himalayan panoramic views)",
        ],
      },
    ],
  },
];

const DiversityPage = () => {
  const [activeTab, setActiveTab] = useState("diversity");

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-gray-800 font-serif relative">
          <span className="relative inline-block after:content-[''] after:absolute after:w-1/2 after:h-1 after:bg-[#205781] after:bottom-0 after:left-1/4">
            Uttarakhand
          </span>
        </h1>

        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-white rounded-full shadow-md p-3 border-[#205781] border-2">
            <button
              onClick={() => setActiveTab("diversity")}
              className={`py-2 px-6 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "diversity"
                  ? "bg-[#205781] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#205781]"
              }`}
            >
              Cultural Diversity
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`py-2 px-6 rounded-full text-sm font-medium transition-all duration-200 ${
                activeTab === "history"
                  ? "bg-[#205781] text-white shadow-sm"
                  : "text-gray-600 hover:text-[#205781]"
              }`}
            >
              Rich History
            </button>
          </div>
        </div>

        {activeTab === "diversity" ? (
          <div className="space-y-24">
            {diversityData.map((region, index) => (
              <div key={region.id} className="group">
                <div
                  className={`flex flex-col lg:flex-row ${
                    index % 2 !== 0 ? "lg:flex-row-reverse" : ""
                  } items-center rounded-2xl shadow-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1`}
                >
                  <motion.div
                    className="lg:w-1/2 relative overflow-hidden h-64 sm:h-80 md:h-96 lg:h-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    variants={region.imageAnimation}
                  >
                    <Image
                      src={region.image}
                      alt={region.title}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                    <h2 className="absolute bottom-6 left-6 lg:hidden text-3xl font-bold text-white mb-2 font-serif">
                      {region.title}
                    </h2>
                  </motion.div>

                  <motion.div
                    className="p-6 sm:p-8 lg:p-10 lg:w-1/2"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{
                      duration: 0.8,
                      ease: "easeOut",
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    }}
                    variants={region.contentAnimation}
                  >
                    <h2 className="hidden lg:block text-3xl lg:text-4xl font-bold text-gray-800 mb-6 font-serif border-l-4 border-[#205781] pl-4">
                      {region.title}
                    </h2>
                    <ul className="text-gray-700 space-y-4 md:text-lg leading-relaxed">
                      {region.content.map((item, idx) => (
                        <motion.li
                          key={idx}
                          variants={{
                            hidden: { y: 20, opacity: 0 },
                            visible: { y: 0, opacity: 1 },
                          }}
                          className="bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                          <span className="font-semibold text-gray-900 block mb-1">
                            {item.label}
                          </span>
                          {item.text && <span>{item.text}</span>}
                          {item.list && (
                            <ul className="pl-6 mt-2 space-y-1 list-disc marker:text-[#205781]">
                              {item.list.map((subItem, subIdx) => (
                                <li key={subIdx} className="text-gray-600">
                                  {subItem}
                                </li>
                              ))}
                            </ul>
                          )}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-24">
            <div className="group">
              <div className="flex flex-col lg:flex-row items-center rounded-2xl shadow-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
                <motion.div
                  className="lg:w-1/2 relative overflow-hidden h-64 sm:h-80 md:h-96 lg:h-auto"
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <Image
                    src={historyData.uttarakhand.image}
                    alt={historyData.uttarakhand.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                  <h2 className="absolute bottom-6 left-6 lg:hidden text-3xl font-bold text-white mb-2 font-serif">
                    {historyData.uttarakhand.title}
                  </h2>
                </motion.div>

                <motion.div
                  className="p-6 sm:p-8 lg:p-10 lg:w-1/2"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  }}
                >
                  <h2 className="hidden lg:block text-3xl lg:text-4xl font-bold text-gray-800 mb-6 font-serif border-l-4 border-[#205781] pl-4">
                    {historyData.uttarakhand.title}
                  </h2>
                  <ul className="text-gray-700 space-y-4 md:text-lg leading-relaxed">
                    {historyData.uttarakhand.content.map((item, idx) => (
                      <motion.li
                        key={idx}
                        variants={{
                          hidden: { y: 20, opacity: 0 },
                          visible: { y: 0, opacity: 1 },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <span className="font-semibold text-gray-900 block mb-1">
                          {item.label}
                        </span>
                        <span>{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            <div className="group">
              <div className="flex flex-col lg:flex-row-reverse items-center rounded-2xl shadow-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
                <motion.div
                  className="lg:w-1/2 relative overflow-hidden h-64 sm:h-80 md:h-96 lg:h-auto"
                  initial={{ x: 100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <Image
                    src={historyData.garhwal.image}
                    alt={historyData.garhwal.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                  <h2 className="absolute bottom-6 left-6 lg:hidden text-3xl font-bold text-white mb-2 font-serif">
                    {historyData.garhwal.title}
                  </h2>
                </motion.div>

                <motion.div
                  className="p-6 sm:p-8 lg:p-10 lg:w-1/2"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  }}
                >
                  <h2 className="hidden lg:block text-3xl lg:text-4xl font-bold text-gray-800 mb-6 font-serif border-l-4 border-[#205781] pl-4">
                    {historyData.garhwal.title}
                  </h2>
                  <ul className="text-gray-700 space-y-4 md:text-lg leading-relaxed">
                    {historyData.garhwal.content.map((item, idx) => (
                      <motion.li
                        key={idx}
                        variants={{
                          hidden: { y: 20, opacity: 0 },
                          visible: { y: 0, opacity: 1 },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <span className="font-semibold text-gray-900 block mb-1">
                          {item.label}
                        </span>
                        <span>{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>

            <div className="group">
              <div className="flex flex-col lg:flex-row items-center rounded-2xl shadow-xl overflow-hidden bg-white transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1">
                <motion.div
                  className="lg:w-1/2 relative overflow-hidden h-64 sm:h-80 md:h-96 lg:h-auto"
                  initial={{ x: -100, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 1, ease: "easeOut" }}
                >
                  <Image
                    src={historyData.kumaon.image}
                    alt={historyData.kumaon.title}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60"></div>
                  <h2 className="absolute bottom-6 left-6 lg:hidden text-3xl font-bold text-white mb-2 font-serif">
                    {historyData.kumaon.title}
                  </h2>
                </motion.div>

                <motion.div
                  className="p-6 sm:p-8 lg:p-10 lg:w-1/2"
                  initial={{ y: 50, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    staggerChildren: 0.1,
                    delayChildren: 0.2,
                  }}
                >
                  <h2 className="hidden lg:block text-3xl lg:text-4xl font-bold text-gray-800 mb-6 font-serif border-l-4 border-[#205781] pl-4">
                    {historyData.kumaon.title}
                  </h2>
                  <ul className="text-gray-700 space-y-4 md:text-lg leading-relaxed">
                    {historyData.kumaon.content.map((item, idx) => (
                      <motion.li
                        key={idx}
                        variants={{
                          hidden: { y: 20, opacity: 0 },
                          visible: { y: 0, opacity: 1 },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                      >
                        <span className="font-semibold text-gray-900 block mb-1">
                          {item.label}
                        </span>
                        <span>{item.text}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-center mt-16">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="px-6 py-3 bg-[#205781] text-white rounded-full font-medium shadow-lg hover:bg-[#485f76] transition-colors duration-300 flex items-center"
          >
            <svg
              className="w-5 h-5 mr-2"
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
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default DiversityPage;
